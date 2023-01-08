import {
  Algorithm1Demo,
  Algorithm2Demo,
  Algorithm3Demo
} from '../../demos/tree-drawing/tidy-drawings-of-trees'
import { TRAlgorithmDemo } from '../../demos/tree-drawing/tidier-drawings-of-trees'
import { WalkerAlgorithmDemo } from '../../demos/tree-drawing/a-node-positioning-algorithm-for-general-trees'
function TreeDrawing() {
  return (
    <>
      <Algorithm1Demo />
      <Algorithm2Demo />
      <Algorithm3Demo />
      <TRAlgorithmDemo />
      <WalkerAlgorithmDemo />
    </>
  )
}
export default TreeDrawing
