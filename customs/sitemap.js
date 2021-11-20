// https://leerob.io/blog/nextjs-sitemap-robots
const fs = require('fs')
const globby = require('globby')
const prettier = require('prettier')

;(async () => {
  const pages = await globby([
    'pages/**/*{.js,.mdx}',
    '!pages/_*.js',
    '!pages/api'
  ])
  const sitemap = `
  <?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map((page) => {
          const path = page
            .replace('pages', '')
            .replace('/index.js', '')
            .replace('.js', '')
            .replace('.mdx', '')
          const route = path === '/index' ? '' : path

          // todo
          if (route === '/about') {
            return ''
          }
          return `
                  <url>
                      <loc>${`https://bowencodes.com${route}`}</loc>
                  </url>
              `
        })
        .join('')}
  </urlset>
`
  const formatted = prettier.format(sitemap, {
    parser: 'html'
  })
  fs.writeFileSync('public/sitemap.xml', formatted)
})()
