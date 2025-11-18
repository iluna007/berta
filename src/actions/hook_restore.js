// src/actions/hook_restore.js

import {
  fetchDomain,
  updateDomain,
  rehydrateState,
} from "./index"; // importa todas las acciones ya existentes

/**
 * Este “hook” restaura completamente el estado de la plataforma, 
 * replicando lo que ocurre cuando Dashboard se monta por primera vez.
 */
export const hook_restore = () => {
  return async (dispatch, getState) => {
    // 1. Volver a calcular domain y features
    const domain = await dispatch(fetchDomain());
    
    await dispatch(
      updateDomain({
        domain,
        features: getState().features,
      })
    );

    // 2. Rehidratar timeline, escalas, eventos, etc.
    await dispatch(rehydrateState());

    // 3. Forzar resize para recalcular dimensiones del timeline/mapa
    window.dispatchEvent(new Event("resize"));
  };
};
