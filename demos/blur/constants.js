import gaussianBlur from './gaussian'
import { simpleBoxBlur, boxBlur } from './box'
import { hMotionBlur, vMotionBlur, mutantBoxBlur } from './motion'
import fastBlur from './fast'
export const blurMap = {
  gaussian: {
    caller: gaussianBlur,
    sigma: true
  },
  simpleBox: {
    caller: simpleBoxBlur,
    sigma: false
  },
  box: {
    caller: boxBlur,
    sigma: true
  },
  hMotion: {
    caller: hMotionBlur,
    sigma: false
  },
  vMotion: {
    caller: vMotionBlur,
    sigma: false
  },
  mutantBox: {
    caller: mutantBoxBlur,
    sigma: true
  },
  fast: {
    caller: fastBlur,
    sigma: true
  }
}
export const blurOptions = [
  {
    text: '高斯模糊',
    value: 'gaussian'
  },
  {
    text: '简单方框模糊',
    value: 'simpleBox'
  },
  {
    text: '改进方框模糊',
    value: 'box'
  },
  {
    text: '水平模糊',
    value: 'hMotion'
  },
  {
    text: '垂直模糊',
    value: 'vMotion'
  },
  {
    text: '水平 & 垂直多次组合模糊',
    value: 'mutantBox'
  },
  {
    text: '高速模糊',
    value: 'fast'
  }
]
