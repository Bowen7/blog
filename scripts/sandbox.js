const path = require('path')
module.exports = function (source) {
  const extname = path.extname(this.resourcePath)
  return '```' + extname.slice(1) + '\n' + source.trim() + '\n```'
}
