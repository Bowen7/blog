import { memo } from 'react'
import cloneDeep from 'lodash/cloneDeep'
import { root as treeRoot } from './tree'
import { renderTree } from './utils'

const algorithm1 = (root) => {}

export const Algorithm1Demo = memo(() => {
  const laidoutRoot = algorithm1(cloneDeep(treeRoot))
  return renderTree(laidoutRoot)
})

Algorithm1Demo.displayName = 'Algorithm1Demo'
