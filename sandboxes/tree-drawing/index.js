import cloneDeep from 'lodash/cloneDeep'
import {
  maryRoot,
  maryLevel,
  binaryRoot,
  binaryLevel,
  tidierRoot,
  tidierLevel
} from './root'
import { renderMaryTree, renderBinaryTree } from './utils'
import { layout as tidyLayout1 } from './tidy-drawings-of-trees-algorithm1'
import { layout as tidyLayout2 } from './tidy-drawings-of-trees-algorithm2'
import { layout as tidyLayout3 } from './tidy-drawings-of-trees-algorithm3'
import { layout as tidierLayout } from './tidier-drawings-of-trees'
import { layout as walkerLayout } from './a-node-positioning-algorithm-for-general-trees'
import { layout as improvedWalkerLayout } from './improving-walker-algorithm-to-run-in-linear-time'

export const TidySandbox1 = () => {
  const laidoutRoot = tidyLayout1(cloneDeep(maryRoot), maryLevel)
  return renderMaryTree(laidoutRoot)
}

export const TidySandbox2 = () => {
  const laidoutRoot = tidyLayout2(cloneDeep(binaryRoot), binaryLevel)
  return renderBinaryTree(laidoutRoot)
}

export const TidySandbox3 = () => {
  const laidoutRoot = tidyLayout3(cloneDeep(binaryRoot), binaryLevel)
  return renderBinaryTree(laidoutRoot)
}

export const TidySandbox4 = () => {
  const laidoutRoot = tidyLayout3(cloneDeep(tidierRoot), tidierLevel)
  return renderBinaryTree(laidoutRoot)
}

export const TidierSandbox = () => {
  const laidoutRoot = tidierLayout(cloneDeep(tidierRoot), tidierLevel)
  return renderBinaryTree(laidoutRoot)
}

export const WalkerSandbox = () => {
  const laidoutRoot = walkerLayout(cloneDeep(maryRoot), maryLevel)
  return renderMaryTree(laidoutRoot)
}

export const ImprovedWalkerSandbox = () => {
  const laidoutRoot = improvedWalkerLayout(cloneDeep(maryRoot), maryLevel)
  return renderMaryTree(laidoutRoot)
}
