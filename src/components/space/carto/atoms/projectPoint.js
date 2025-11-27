export function createProjectPoint(map, mapTransformX = 0, mapTransformY = 0) {
  return function projectPoint([lat, lng]) {
    if (!map) return { x: 0, y: 0 };
    const latLng = new window.L.LatLng(lat, lng);
    const point = map.latLngToLayerPoint(latLng);
    return {
      x: point.x + mapTransformX,
      y: point.y + mapTransformY,
    };
  };
}
