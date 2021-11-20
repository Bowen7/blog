import { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import Slider from '@geist-ui/react/esm/slider'
import Button from '@geist-ui/react/esm/button'
import Radio from '@geist-ui/react/esm/radio'
import Loading from '@geist-ui/react/esm/loading'
import { genSrcAndDest, mergeChannels } from './utils'
import { blurMap, blurOptions } from './constants'

const Wrapper = styled.div`
  width: 100%;
  padding: 0 0.5rem;
`
const SliderWrap = styled.div`
  margin-bottom: 1rem;
`
const ButtonWrap = styled.div`
  margin-top: 1rem;
  text-align: center;
`
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
  }, [loading])
  function resetCanvas() {
    const clientWidth = canvasWrapRef.current.clientWidth
    setCanvasWidth(clientWidth)

    const srcCtx = srcRef.current.getContext('2d')
    const img = new Image()
    img.src = '/demos/blur/input.jpg'
    img.onload = () => {
      srcCtx.drawImage(img, 0, 0, clientWidth, clientWidth * 0.238)
    }
  }
  const handleSigmaChange = (value) => {
    setSigma(value)
  }
  const handleTypeChange = (value) => {
    setType(value)
  }
  const handleClick = () => {
    setDestShow(true)
    setLoading(true)
  }
  return (
    <Wrapper>
      <div ref={canvasWrapRef}>
        <canvas
          ref={srcRef}
          width={canvasWidth}
          height={canvasWidth * 0.238}
        ></canvas>
        {loading && <Loading size="large" />}
        {destShow && (
          <canvas
            ref={destRef}
            width={canvasWidth}
            height={canvasWidth * 0.238}
          ></canvas>
        )}
      </div>
      {time && <p>耗时: {time}ms</p>}
      <SliderWrap width={canvasWidth}>
        <p>
          {blurMap[type].sigma ? 'Sigma' : 'Radius'}: {sigma}
        </p>
        <Slider
          step={1}
          min={1}
          max={20}
          showMarkers
          value={sigma}
          onChange={handleSigmaChange}
        />
      </SliderWrap>
      <Radio.Group value={type} onChange={handleTypeChange}>
        {blurOptions.map(({ value, text }) => (
          <Radio value={value} key={value}>
            {text}
          </Radio>
        ))}
      </Radio.Group>
      <p>注：简单方框模糊、水平模糊、垂直模糊的参数为 radius，其余模糊为 sigma</p>
      <ButtonWrap>
        <Button auto loading={loading} onClick={handleClick}>
          生成
        </Button>
      </ButtonWrap>
    </Wrapper>
  )
}
export default Blur
