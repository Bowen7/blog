const withPlugins = require('next-compose-plugins')
const remarkMath = require('remark-math')
const rehypeKatex = require('rehype-katex')
const withTM = require('next-transpile-modules')(['@geist-ui/react'])
const { resolve } = require('path')

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    rehypePlugins: [rehypeKatex],
    remarkPlugins: [remarkMath]
  }
})

const plugins = [
  [
    withMDX,
    {
      pageExtensions: ['js', 'mdx'],
      webpack(config, { isServer }) {
        if (isServer && process.env.NODE_ENV === 'production') {
          require('./customs/sitemap')
        }

        config.module.rules.forEach((rule) => {
          if (rule.test && rule.test.test('test.mdx')) {
            rule.use.push(resolve(__dirname, './customs/loader'))
          }
        })
        return config
      }
    }
  ],
  [withTM]
]

const nextConfig = {
  env: {
    CESIUM_TOKEN: process.env.CESIUM_TOKEN,
    MAPBOX_TOKEN: process.env.MAPBOX_TOKEN
  }
}
module.exports = withPlugins(plugins, nextConfig)
