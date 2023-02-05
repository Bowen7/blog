import { useRef, useEffect, useState } from 'react'
import clsx from 'clsx'
import { genSrcAndDest, mergeChannels } from './utils'
import { blurMap, blurOptions } from './constants'
function Blur() {
  const [sigma, setSigma] = useState(5)
  const [time, setTime] = useState()
  const [loading, setLoading] = useState(false)
  const [destShow, setDestShow] = useState(false)
  const [type, setType] = useState('gaussian')
  const [canvasWidth, setCanvasWidth] = useState(480)
  const srcRef = useRef()
  const destRef = useRef()
  const canvasWrapRef = useRef()
  useEffect(() => {
    resetCanvas()
    window.addEventListener('resize', resetCanvas)
    return () => {
      window.removeEventListener('resize', resetCanvas)
    }
  }, [])
  useEffect(() => {
    if (!loading) {
      return
    }
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const srcCtx = srcRef.current.getContext('2d')
        const destCtx = destRef.current.getContext('2d')
        const imageData = srcCtx.getImageData(
          0,
          0,
          canvasWidth,
          canvasWidth * 0.238
        )
        const { width, height } = imageData
        const { src: srcRgba, dest: destRgba } = genSrcAndDest(imageData.data)
        const start = performance.now()
        for (let i = 0; i < 3; i++) {
          blurMap[type].caller(srcRgba[i], destRgba[i], width, height, sigma)
        }
        const time = performance.now() - start
        const destData = mergeChannels(destRgba)
        imageData.data.set(destData)
        destCtx.putImageData(imageData, 0, 0)
        setTime(time)
        setLoading(false)
      })
    })
  }, [loading])

  function resetCanvas() {
    const clientWidth = canvasWrapRef.current.clientWidth
    setCanvasWidth(clientWidth)

    const srcCtx = srcRef.current.getContext('2d')
    const img = new Image()
    img.src = '/demos/blur/source.png'
    img.onload = () => {
      srcCtx.drawImage(img, 0, 0, clientWidth, clientWidth * 0.238)
    }
  }
  const handleSigmaChange = (e) => {
    setSigma(parseInt(e.target.value))
  }
  const handleTypeChange = (value) => {
    setType(value)
  }
  const handleClick = () => {
    setDestShow(true)
    setLoading(true)
  }
  return (
    <>
      <div ref={canvasWrapRef}>
        <canvas
          ref={srcRef}
          width={canvasWidth}
          height={canvasWidth * 0.238}
        ></canvas>
        {destShow && (
          <canvas
            ref={destRef}
            width={canvasWidth}
            height={canvasWidth * 0.238}
          ></canvas>
        )}
      </div>
      {time && <p>耗时: {time}ms</p>}
      <div className="mb-4" width={canvasWidth}>
        <p>
          {blurMap[type].sigma ? 'Sigma' : 'Radius'}: {sigma}
        </p>
        <input
          type="range"
          min="1"
          max="20"
          value={sigma}
          step="1"
          className="range range-xs"
          onChange={handleSigmaChange}
        />
      </div>
      {blurOptions.map(({ value, text }) => (
        <div
          className="form-control"
          key={value}
          onClick={() => handleTypeChange(value)}
        >
          <label className="label cursor-pointer">
            <span className="label-text">{text}</span>
            <input
              type="radio"
              name="radio-10"
              className="radio"
              checked={value === type}
            />
          </label>
        </div>
      ))}
      <p>
        注：简单方框模糊、水平模糊、垂直模糊的参数为 radius，其余模糊为 sigma
      </p>
      <div className="mt-4 text-center">
        <button
          className={clsx('btn', loading && 'loading')}
          onClick={handleClick}
        >
          Generate
        </button>
      </div>
    </>
  )
}
export default Blur
