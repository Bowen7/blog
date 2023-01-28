import { memo } from 'react'
import cloneDeep from 'lodash/cloneDeep'
import { maryRoot } from './tree'
import { renderMaryTree } from './utils'
const improvedWalkerAlgorithm = (root) => {
  const apportion = () => {}

  const firstWalk = () => {}

  const secondWalk = () => {}
}

export const ImprovedWalkerAlgorithmDemo = memo(() => {
  const laidoutRoot = improvedWalkerAlgorithm(cloneDeep(maryRoot))
  return renderMaryTree(laidoutRoot)
})

ImprovedWalkerAlgorithmDemo.displayName = 'ImprovedWalkerAlgorithmDemo'
