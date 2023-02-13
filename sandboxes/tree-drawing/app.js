import { root, level, renderTree } from './tree'
import layout from './layout'

const cloneDeep = (data) => JSON.parse(JSON.stringify(data))

export default function App() {
  const laidoutRoot = layout(cloneDeep(root), level)
  return renderTree(laidoutRoot)
}
