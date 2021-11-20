function gaussianBlur(src, dest, width, height, sigma) {
  const radius = Math.round(sigma * 3) // kernel size
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      let accumulation = 0
      let weightSum = 0
      for (let dx = -radius; dx <= radius; dx++) {
        for (let dy = -radius; dy <= radius; dy++) {
          const x = Math.min(width - 1, Math.max(0, i + dx))
          const y = Math.min(height - 1, Math.max(0, j + dy))
          // calc weight
          const weight =
            Math.exp(
              -(Math.pow(dx, 2) + Math.pow(dy, 2)) / (2 * Math.pow(sigma, 2))
            ) /
            (Math.PI * 2 * Math.pow(sigma, 2))
          accumulation += src[y * width + x] * weight
          weightSum += weight
        }
      }
      dest[j * width + i] = Math.round(accumulation / weightSum)
    }
  }
}
export default gaussianBlur
