import { genKernelsForGaussian } from './utils'
// horizontal motion blur
function hMotionBlur(src, dest, width, height, radius) {
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      let accumulation = 0
      for (let dx = -radius; dx <= radius; dx++) {
        const x = Math.min(width - 1, Math.max(0, i + dx))
        accumulation += src[j * width + x]
      }
      dest[j * width + i] = Math.round(accumulation / (2 * radius + 1))
    }
  }
}

// vertical motion blur
function vMotionBlur(src, dest, width, height, radius) {
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      let accumulation = 0
      for (let dy = -radius; dy <= radius; dy++) {
        const y = Math.min(height - 1, Math.max(0, j + dy))
        accumulation += src[y * width + i]
      }
      dest[j * width + i] = Math.round(accumulation / (2 * radius + 1))
    }
  }
}

function _mutantBoxBlur(src, dest, width, height, radius) {
  hMotionBlur(dest, src, width, height, radius)
  vMotionBlur(src, dest, width, height, radius)
}

function mutantBoxBlur(src, dest, width, height, sigma) {
  const boxes = genKernelsForGaussian(sigma, 3)
  for (let i = 0; i < src.length; i++) {
    dest[i] = src[i]
  }
  _mutantBoxBlur(src, dest, width, height, (boxes[0] - 1) / 2)
  _mutantBoxBlur(src, dest, width, height, (boxes[1] - 1) / 2)
  _mutantBoxBlur(src, dest, width, height, (boxes[2] - 1) / 2)
}

export { hMotionBlur, vMotionBlur, mutantBoxBlur }
