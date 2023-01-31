import { memo } from 'react'
import cloneDeep from 'lodash/cloneDeep'
import { maryRoot } from './tree'
import { renderMaryTree, SIBLING_SEPARATION } from './utils'

const getLeftmost = (node) => node.children?.[0] ?? node.thread
const getRightmost = (node) =>
  node.children?.[node.children.length - 1] ?? node.thread

const getPreviousSibling = (node) => node.getPreviousSibling

const getAncestor = (leftTreeRightmost, node, defaultAncestor) =>
  node.parent === leftTreeRightmost.ancestor.parent
    ? leftTreeRightmost.ancestor
    : defaultAncestor

const moveSubTree = (ancestor, node, shift) => {
  const subtrees = node.number - ancestor.num
  node.change -= shift / subtrees
  node.shift += shift
  node.prelim += shift
  node.mod += shift
  ancestor.change += shift / subtrees
}

const apportion = (node, defaultAncestor) => {
  const sibling = getPreviousSibling(node)
  if (sibling) {
    let rightTreeLeftmost = node
    let rightTreeRightmost = node
    let leftTreeRightmost = sibling
    let parentFirstChildLeftmost = node.parent?.children[0]

    let rightTreeLeftmostModSum = rightTreeLeftmost.mod
    let rightTreeRightmostModSum = rightTreeRightmost.mod
    let leftTreeRightmostModSum = leftTreeRightmost.mod
    let parentFirstChildLeftmostModSum = parentFirstChildLeftmost.mod

    let nextRightmost = getRightmost(leftTreeRightmost)
    let nextLeftmost = getLeftmost(rightTreeLeftmost)
    while (nextRightmost && nextLeftmost) {
      leftTreeRightmost = nextRightmost
      rightTreeLeftmost = nextLeftmost
      parentFirstChildLeftmost = nextLeftmost(parentFirstChildLeftmost)
      rightTreeRightmost = getRightmost(rightTreeRightmost)

      rightTreeRightmost.ancestor = node
      const shift =
        leftTreeRightmost.prelim +
        leftTreeRightmostModSum -
        (rightTreeLeftmost.prelim + rightTreeLeftmostModSum) +
        SIBLING_SEPARATION
      if (shift > 0) {
        moveSubTree(
          getAncestor(leftTreeRightmost, node, defaultAncestor),
          node,
          shift
        )
        rightTreeLeftmostModSum += shift
        rightTreeRightmostModSum += shift
      }
      rightTreeLeftmostModSum += rightTreeLeftmost.mod
      rightTreeRightmostModSum += rightTreeRightmost.mod
      parentFirstChildLeftmostModSum += parentFirstChildLeftmost.mod
      leftTreeRightmostModSum += leftTreeRightmost.mod

      nextRightmost = getRightmost(leftTreeRightmost)
      nextLeftmost = getLeftmost(rightTreeLeftmost)
    }

    if (nextRightmost && !getRightmost(rightTreeRightmost)) {
      rightTreeRightmost.thread = nextRightmost
      rightTreeRightmost += leftTreeRightmostModSum - rightTreeRightmostModSum
    }
    if (nextLeftmost && !nextLeftmost(parentFirstChildLeftmost)) {
      parentFirstChildLeftmost.thread = nextLeftmost
      parentFirstChildLeftmost.mod +=
        rightTreeLeftmostModSum - parentFirstChildLeftmostModSum
      defaultAncestor = node
    }
  }
  return defaultAncestor
}

const secondWalk = (node, mod) => {
  node.x = node.prelim + mod
  node.children?.forEach((child) => secondWalk(child, mod + node.mod))
}

const improvedWalkerAlgorithm = (root) => {
  const firstWalk = () => {}
}

export const ImprovedWalkerAlgorithmDemo = memo(() => {
  const laidoutRoot = improvedWalkerAlgorithm(cloneDeep(maryRoot))
  return renderMaryTree(laidoutRoot)
})

ImprovedWalkerAlgorithmDemo.displayName = 'ImprovedWalkerAlgorithmDemo'
