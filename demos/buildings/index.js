import { useEffect } from 'react'
import createBuildings from './create-buildings'
import createTraces from './create-traces'

const CESIUM_TOKEN = process.env.CESIUM_TOKEN
const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN
function Buildings() {
  useEffect(() => {
    const Cesium = window.Cesium
    Cesium.Ion.defaultAccessToken = CESIUM_TOKEN
    Cesium.ExperimentalFeatures.enableModelExperimental = true

    const mapboxProvider = new Cesium.MapboxStyleImageryProvider({
      styleId: 'dark-v10',
      accessToken: MAPBOX_TOKEN
    })
    const viewer = new Cesium.Viewer('cesiumContainer', {
      geocoder: false,
      homeButton: false,
      sceneModePicker: false,
      baseLayerPicker: false,
      navigationHelpButton: false,
      animation: false,
      timeline: false,
      fullscreenButton: false,
      vrButton: false,
      infoBox: false,
      terrainProvider: Cesium.createWorldTerrain(),
      imageryProvider: mapboxProvider
    })

    viewer.scene.postProcessStages.fxaa.enabled = true
    viewer.resolutionScale = window.devicePixelRatio

    createBuildings(viewer)
    createTraces(viewer)
  }, [])
  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/cesium@1.87.1/Build/Cesium/Widgets/widgets.css"
        rel="stylesheet"
      ></link>
      <script src="https://cdn.jsdelivr.net/npm/cesium@1.87.1/Build/Cesium/Cesium.js" />

      <div id="cesiumContainer"></div>
    </>
  )
}
export default Buildings
