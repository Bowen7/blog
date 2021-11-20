import { genKernelsForGaussian } from './utils'
function simpleBoxBlur(src, dest, width, height, radius) {
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      let accumulation = 0
      for (let dx = -radius; dx <= radius; dx++) {
        for (let dy = -radius; dy <= radius; dy++) {
          const x = Math.min(width - 1, Math.max(0, i + dx))
          const y = Math.min(height - 1, Math.max(0, j + dy))
          accumulation += src[y * width + x]
        }
      }
      dest[j * width + i] = Math.round(
        accumulation / Math.pow(2 * radius + 1, 2)
      )
    }
  }
}

function boxBlur(src, dest, width, height, sigma) {
  const kernels = genKernelsForGaussian(sigma, 3)
  simpleBoxBlur(src, dest, width, height, (kernels[0] - 1) / 2)
  simpleBoxBlur(dest, src, width, height, (kernels[1] - 1) / 2)
  simpleBoxBlur(src, dest, width, height, (kernels[2] - 1) / 2)
}

export { simpleBoxBlur, boxBlur }
