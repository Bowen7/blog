import { genKernelsForGaussian } from './utils'
// horizontal fast motion blur
function hFastMotionBlur(src, dest, width, height, radius) {
  for (let i = 0; i < height; i++) {
    let accumulation = radius * src[i * width]
    for (let j = 0; j <= radius; j++) {
      accumulation += src[i * width + j]
    }
    dest[i * width] = Math.round(accumulation / (2 * radius + 1))
    for (let j = 1; j < width; j++) {
      const left = Math.max(0, j - radius - 1)
      const right = Math.min(width - 1, j + radius)
      accumulation =
        accumulation + (src[i * width + right] - src[i * width + left])
      dest[i * width + j] = Math.round(accumulation / (2 * radius + 1))
    }
  }
}

// vertical fast motion blur
function vFastMotionBlur(src, dest, width, height, radius) {
  for (let i = 0; i < width; i++) {
    let accumulation = radius * src[i]
    for (let j = 0; j <= radius; j++) {
      accumulation += src[j * width + i]
    }
    dest[i] = Math.round(accumulation / (2 * radius + 1))
    for (let j = 1; j < height; j++) {
      const top = Math.max(0, j - radius - 1)
      const bottom = Math.min(height - 1, j + radius)
      accumulation =
        accumulation + src[bottom * width + i] - src[top * width + i]
      dest[j * width + i] = Math.round(accumulation / (2 * radius + 1))
    }
  }
}

function _fastBlur(src, dest, width, height, radius) {
  hFastMotionBlur(dest, src, width, height, radius)
  vFastMotionBlur(src, dest, width, height, radius)
}

function fastBlur(src, dest, width, height, sigma) {
  const boxes = genKernelsForGaussian(sigma, 3)
  for (let i = 0; i < src.length; i++) {
    dest[i] = src[i]
  }
  _fastBlur(src, dest, width, height, (boxes[0] - 1) / 2)
  _fastBlur(src, dest, width, height, (boxes[1] - 1) / 2)
  _fastBlur(src, dest, width, height, (boxes[2] - 1) / 2)
}
export default fastBlur
