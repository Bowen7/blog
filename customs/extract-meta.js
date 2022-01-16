import { parse } from '@babel/parser'
import generate from '@babel/generator'
import traverse from '@babel/traverse'
import mdx from '@mdx-js/mdx'
import visit from 'unist-util-visit'

const createExtractMdxMetadataPlugin = (meta) => () => (tree) => {
  visit(tree, 'export', (node) => {
    const ast = parse(node.value, {
      plugins: ['jsx'],
      sourceType: 'module'
    })

    traverse(ast, {
      VariableDeclarator: (path) => {
        if (path.node.id.name === 'meta') {
          // eslint-disable-next-line no-eval
          const _meta = eval(
            `module.exports = ${generate(path.node.init).code}`
          )
          Object.keys(_meta).forEach((key) => {
            meta[key] = _meta[key]
          })
        }
      }
    })
  })
}

const extractMeta = async (content) => {
  const meta = {}

  await mdx(content, {
    remarkPlugins: [createExtractMdxMetadataPlugin(meta)]
  })

  return meta
}

export default extractMeta
