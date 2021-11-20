const genSrcAndDest = (data) => {
  const dataInt8 = new Uint8ClampedArray(data.buffer)
  const simpleChannelLength = dataInt8.length / 4
  const r = new Uint8ClampedArray(simpleChannelLength)
  const g = new Uint8ClampedArray(simpleChannelLength)
  const b = new Uint8ClampedArray(simpleChannelLength)
  const a = new Uint8ClampedArray(simpleChannelLength)
  const _r = new Uint8ClampedArray(simpleChannelLength)
  const _g = new Uint8ClampedArray(simpleChannelLength)
  const _b = new Uint8ClampedArray(simpleChannelLength)
  const _a = new Uint8ClampedArray(simpleChannelLength)
  for (let i = 0; i < simpleChannelLength; i++) {
    _r[i] = r[i] = dataInt8[i * 4]
    _g[i] = g[i] = dataInt8[i * 4 + 1]
    _b[i] = b[i] = dataInt8[i * 4 + 2]
    _a[i] = a[i] = dataInt8[i * 4 + 3]
  }
  return { src: [r, g, b, a], dest: [_r, _g, _b, _a] }
}

const mergeChannels = ([r, g, b, a]) => {
  const simpleChannelLength = r.length
  const data = new Uint8ClampedArray(simpleChannelLength * 4)
  for (let i = 0; i < simpleChannelLength; i++) {
    data[4 * i] = r[i]
    data[4 * i + 1] = g[i]
    data[4 * i + 2] = b[i]
    data[4 * i + 3] = a[i]
  }
  return data
}

function genKernelsForGaussian(sigma, n) {
  const wIdeal = Math.sqrt((12 * Math.pow(sigma, 2)) / n + 1)
  let wl = Math.floor(wIdeal)
  if (wl % 2 === 0) {
    wl--
  }
  const wu = wl + 2
  let m =
    (12 * Math.pow(sigma, 2) - n * Math.pow(wl, 2) - 4 * n * wl - 3 * n) /
    (-4 * wl - 4)
  m = Math.round(m)
  const sizes = []
  for (let i = 0; i < n; i++) {
    sizes.push(i < m ? wl : wu)
  }
  return sizes
}

export { genSrcAndDest, mergeChannels, genKernelsForGaussian }
