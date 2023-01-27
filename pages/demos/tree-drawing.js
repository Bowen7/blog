import {
  Algorithm1Demo,
  Algorithm2Demo,
  Algorithm3Demo
} from '../../demos/tree-drawing/tidy-drawings-of-trees'
import { TRAlgorithmDemo } from '../../demos/tree-drawing/tidier-drawings-of-trees'
import { WalkerAlgorithmDemo } from '../../demos/tree-drawing/a-node-positioning-algorithm-for-general-trees'
import '../../demos/tree-drawing/greatest-distinct-ancestors'
function TreeDrawing() {
  return (
    <>
      <div>
        <Algorithm1Demo />
      </div>
      <div>
        <Algorithm2Demo />
      </div>
      <div>
        <Algorithm3Demo />
      </div>
      <div>
        <TRAlgorithmDemo />
      </div>
      <div>
        <WalkerAlgorithmDemo />
      </div>
    </>
  )
}
export default TreeDrawing
