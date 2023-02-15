import rehypePrettyCode from 'rehype-pretty-code'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import nextMdx from '@next/mdx'
import remarkGfm from 'remark-gfm'
import path from 'path'

const __dirname = path.resolve()

const mdxOptions = {
  providerImportSource: '@mdx-js/react',
  rehypePlugins: [
    rehypeKatex,
    [
      rehypePrettyCode,
      {
        theme: 'min-light',
        onVisitLine(node) {
          // Prevent lines from collapsing in `display: grid` mode, and allow empty
          // lines to be copy/pasted
          if (node.children.length === 0) {
            node.children = [{ type: 'text', value: ' ' }]
          }
        },
        onVisitHighlightedLine(node) {
          node.properties.className.push('line--highlighted')
        },
        onVisitHighlightedWord(node) {
          node.properties.className = ['word--highlighted']
        }
      }
    ]
  ],
  remarkPlugins: [remarkMath, remarkGfm]
}

const withMDX = nextMdx({
  extension: /\.mdx?$/,
  options: mdxOptions
})

const nextConfig = {
  // Configure pageExtensions to include md and mdx
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  // Optionally, add any other Next.js config below
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /sandboxes\/.*\.js$/,
      exclude: /index\.js$/,
      issuer: /post\/.*\.mdx$/,
      use: [
        {
          loader: '@mdx-js/loader',
          options: mdxOptions
        },
        { loader: 'sandbox-loader' }
      ]
    })

    config.resolveLoader.alias['sandbox-loader'] = path.resolve(
      __dirname,
      'build/sandbox.js'
    )
    return config
  }
}

export default withMDX(nextConfig)
