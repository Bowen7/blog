const durationFrame = '500.0'
const source = `
  uniform vec4 color;

  czm_material czm_getMaterial(czm_materialInput materialInput){
    float frame = czm_frameNumber;
    float progress = mod(frame, ${durationFrame}) / ${durationFrame};
    czm_material material = czm_getDefaultMaterial(materialInput);
    material.diffuse = vec3(0.992, 0.502, 0.365);
    if(materialInput.s < progress || materialInput.s > progress + 0.1) {
      material.alpha = 0.0;
    }
    return material;
  }`

const createTraces = async (viewer) => {
  const Cesium = window.Cesium
  const material = new Cesium.Material({
    fabric: {
      source
    },
    translucent: false
  })
  const res = await fetch(
    'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/trips/trips-v7.json'
  )
  const data = await res.json()
  const geometryInstances = data.map((item) => {
    return new Cesium.GeometryInstance({
      geometry: new Cesium.PolylineGeometry({
        positions: Cesium.Cartesian3.fromDegreesArray(item.path.flat()),
        width: 1.0
      })
    })
  })
  viewer.scene.primitives.add(
    new Cesium.Primitive({
      geometryInstances,
      appearance: new Cesium.PolylineMaterialAppearance({
        material
      })
    })
  )
}
export default createTraces
