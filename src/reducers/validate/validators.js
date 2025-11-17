import createEventSchema from "./eventSchema";
import siteSchema from "./siteSchema";
import associationsSchema from "./associationsSchema";
import sourceSchema from "./sourceSchema";
import regionSchema from "./regionSchema";
import shapeSchema from "./shapeSchema";

import { calcDatetime, capitalize } from "../../common/utilities";

/* ---------------------------------------------
 * SWITCH ELEGANTE PARA ACTIVAR/DESACTIVAR VALIDACIÓN
 * ---------------------------------------------
 */
const VALIDATION_ENABLED = false; // Cambiar a true/false según se necesite

console.log(
  `%c[VALIDATORS] Validation is ${VALIDATION_ENABLED ? "ENABLED ✔️" : "DISABLED🚨"}.`,
  `color: ${VALIDATION_ENABLED ? "green" : "orange"}; font-weight: bold;`
);

/*
 * Create an error notification object
 */
function makeError(type, id, message) {
  return {
    type: "error",
    id,
    message: `${type} ${id}: ${message}`,
  };
}

function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

function findDuplicateAssociations(associations) {
  const seenSet = new Set([]);
  const duplicates = [];
  associations.forEach((item) => {
    if (seenSet.has(item.id)) {
      duplicates.push({
        id: item.id,
        error: makeError(
          "Association",
          item.id,
          "association was found more than once. Ignoring duplicate."
        ),
      });
    } else {
      seenSet.add(item.id);
    }
  });
  return duplicates;
}

/*
 * -------------------------------------------------------
 * VALIDACIÓN + NORMALIZACIÓN (VALIDACIÓN ACTIVABLE)
 * -------------------------------------------------------
 */
export function validateDomain(domain, features) {
  const sanitizedDomain = {
    events: [],
    sites: [],
    associations: [],
    sources: {},
    regions: [],
    shapes: [],
    notifications: domain ? domain.notifications : [],
  };

  if (!domain) return sanitizedDomain;

  const discardedDomain = {
    events: [],
    sites: [],
    associations: [],
    sources: [],
    regions: [],
    shapes: [],
  };

  /*
   *  VALIDACIÓN MODIFICADA:
   *  - Si VALIDATION_ENABLED = false → no se descarta nada.
   *  - Si VALIDATION_ENABLED = true → se valida normalmente.
   */
  function validateArrayItem(item, domainKey, schema) {
    if (VALIDATION_ENABLED) {
      const result = schema.validate(item);
      if (result.error != null) {
        const id = item.id || "-";
        const domainStr = capitalize(domainKey);
        const error = makeError(domainStr, id, result.error.message);
        discardedDomain[domainKey].push({ ...item, error });
        return; // no lo agregamos a sanitizedDomain
      }
    }

    // SIEMPRE agregar el item (cuando VALIDATION_ENABLED está desactivado)
    sanitizedDomain[domainKey].push(item);
  }

  function validateArray(items, domainKey, schema) {
    items.forEach((item) => {
      if (domainKey === "events" && item.date === "" && item.time === "") return;
      validateArrayItem(item, domainKey, schema);
    });
  }

  function validateObject(obj, domainKey, itemSchema) {
    Object.keys(obj).forEach((key) => {
      if (!key) return;
      const vl = obj[key];

      if (VALIDATION_ENABLED) {
        const result = itemSchema.validate(vl);
        if (result.error != null) {
          const id = vl.id || "-";
          const domainStr = capitalize(domainKey);
          discardedDomain[domainKey].push({
            ...vl,
            error: makeError(domainStr, id, result.error.message),
          });
          return;
        }
      }

      sanitizedDomain[domainKey][key] = vl;
    });
  }

  // Asegura que CUSTOM_EVENT_FIELDS exista
  if (!Array.isArray(features.CUSTOM_EVENT_FIELDS)) {
    features.CUSTOM_EVENT_FIELDS = [];
  }

  // VALIDACIONES (pueden quedar activadas o no)
  const eventSchema = createEventSchema(features.CUSTOM_EVENT_FIELDS);
  validateArray(domain.events, "events", eventSchema);
  validateArray(domain.sites, "sites", siteSchema);
  validateArray(domain.associations, "associations", associationsSchema);
  validateObject(domain.sources, "sources", sourceSchema);
  validateArray(domain.regions, "regions", regionSchema);
  validateArray(domain.shapes, "shapes", shapeSchema);

  /*
   * ----------------------------------------------------
   * NORMALIZACIÓN — SIEMPRE SE EJECUTA
   * (indispensable para que mapa/timeline funcionen)
   * ----------------------------------------------------
   */

  // REGIONS → normalización a points[]
  sanitizedDomain.regions = sanitizedDomain.regions.map((region) => ({
    name: region.name,
    points: region.items.map((coords) =>
      coords.replace(/\s/g, "").split(",")
    ),
  }));

  // SHAPES → convertir IDs a objetos reales
  sanitizedDomain.shapes = sanitizedDomain.shapes.reduce((acc, val) => {
    if (!val.shape) {
      if (VALIDATION_ENABLED) {
        discardedDomain.shapes.push({
          ...val,
          error: makeError(
            "events",
            val.id,
            "Invalid event shape. Please specify a shape for this type of event."
          ),
        });
      }
    } else {
      acc.push(val);
    }
    return acc;
  }, []);

  // Asociaciones duplicadas
  const duplicateAssociations = findDuplicateAssociations(domain.associations);
  if (duplicateAssociations.length > 0 && VALIDATION_ENABLED) {
    sanitizedDomain.notifications.push({
      message:
        "Associations are required to be unique. Ignoring duplicates for now.",
      items: duplicateAssociations,
      type: "error",
    });
  }
  sanitizedDomain.associations = domain.associations;

  // EVENTS — normalización profunda
  sanitizedDomain.events = sanitizedDomain.events.filter((event, idx) => {
    let errorMsg = "";
    event.civId = event.id;
    event.id = idx;

    // associations como objetos, no strings
    event.associations = event.associations.reduce((acc, id) => {
      const found = sanitizedDomain.associations.find((elem) => elem.id === id);
      if (found) acc.push(found);
      return acc;
    }, []);

    // shapes como objetos
    if (event.shape) {
      const relatedShapeObj = sanitizedDomain.shapes.find(
        (elem) => elem.id === event.shape
      );
      if (!relatedShapeObj) {
        if (VALIDATION_ENABLED) {
          errorMsg =
            "Failed to find related shape. Please verify shape type for event.";
        }
      } else {
        event.shape = relatedShapeObj;
      }
    }

    // lat/long → reemplazar coma por punto
    event.latitude = event.latitude.replace(",", ".");
    event.longitude = event.longitude.replace(",", ".");

    // datetime
    event.datetime = calcDatetime(event.date, event.time);
    if (!isValidDate(event.datetime)) {
      if (VALIDATION_ENABLED) {
        errorMsg =
          "Invalid date. It's been dropped, as otherwise timemap won't work as expected.";
      }
    }

    if (errorMsg && VALIDATION_ENABLED) {
      discardedDomain.events.push({
        ...event,
        error: makeError("events", event.id, errorMsg),
      });
      return false;
    }

    return true;
  });

  // Ordenar eventos
  sanitizedDomain.events.sort((a, b) => a.datetime - b.datetime);

  // Mensajes finales (solo si VALIDATION_ENABLED = true)
  if (VALIDATION_ENABLED) {
    Object.keys(discardedDomain).forEach((disc) => {
      const len = discardedDomain[disc].length;
      if (len) {
        sanitizedDomain.notifications.push({
          message: `${len} invalid ${disc} not displayed.`,
          items: discardedDomain[disc],
          type: "error",
        });
      }
    });
  }

  return sanitizedDomain;
}
