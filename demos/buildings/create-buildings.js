const createBuildingShader = () => {
  const Cesium = window.Cesium
  return new Cesium.CustomShader({
    lightingModel: Cesium.LightingModel.UNLIT,
    varyings: {
      v_normalMC: Cesium.VaryingType.VEC3
    },
    uniforms: {
      u_texture: {
        value: new Cesium.TextureUniform({
          url: '/demos/buildings/wall.png'
        }),
        type: Cesium.UniformType.SAMPLER_2D
      }
    },
    vertexShaderText: /* glsl */ `
void vertexMain(VertexInput vsInput, inout vec3 positionMC) {
  v_normalMC = vsInput.attributes.normalMC;
}`,
    fragmentShaderText: /* glsl */ `
void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
  vec3 positionMC = fsInput.attributes.positionMC;
  float width = 100.0;
  float height = 100.0;
  if (dot(vec3(0.0, 0.0, 1.0), v_normalMC) > 0.95) {
    material.diffuse = vec3(0.079, 0.107, 0.111);
    return;
  } else {
    float textureX = 0.0;
    float dotXAxis = dot(vec3(0.0, 1.0, 0.0), v_normalMC);
    if (dotXAxis > 0.52 || dotXAxis < -0.52) {
      textureX = mod(positionMC.x, width) / width;
    } else {
      textureX = mod(positionMC.y, width) / width;
    }
    float textureY = mod(positionMC.z, height) / height;
    vec3 rgb = texture2D(u_texture, vec2(textureX, textureY)).rgb;

    material.diffuse = rgb;
    return;
  }
  material.diffuse = vec3(0.129, 0.157, 0.161);
}`
  })
}
const createBuildings = (viewer) => {
  const Cesium = window.Cesium
  viewer.scene.primitives.add(
    Cesium.createOsmBuildings({
      showOutline: false,
      customShader: createBuildingShader(),
      // 筛选掉低层建筑
      style: new Cesium.Cesium3DTileStyle({
        color: 'vec4(1.0, 1.0, 1.0, 1.0)',
        show: {
          conditions: [
            [
              // eslint-disable-next-line no-template-curly-in-string
              '${height} === undefined || ${height} === null || isNaN(${height}) ',
              'false'
            ],
            // eslint-disable-next-line no-template-curly-in-string
            ['Number(${height}) < 75', 'false']
          ]
        }
      })
    })
  )

  viewer.scene.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(-74.019, 40.6912, 750),
    orientation: {
      heading: Cesium.Math.toRadians(20),
      pitch: Cesium.Math.toRadians(-20)
    }
  })
}
export default createBuildings
