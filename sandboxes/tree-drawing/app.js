import { maryRoot, maryMaxLevel } from './root'
import { renderMaryTree, cloneDeep } from './utils'
import layout from './layout'

export default function App() {
  const laidoutRoot = layout(cloneDeep(maryRoot), maryMaxLevel)
  return renderMaryTree(laidoutRoot)
}
