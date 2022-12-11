import { memo } from 'react'
import cloneDeep from 'lodash/cloneDeep'
import {
  root as treeRoot,
  maxLevel as treeMaxLevel,
  binaryRoot,
  binaryMaxLevel
} from './tree'
import {
  renderTree,
  renderBinaryTree,
  SIBLING_SEPARATION,
  LEVEL_SEPARATION,
  NODE_WIDTH,
  NODE_HEIGHT,
  GRAPH_PADDING
} from './utils'

const algorithm1 = (root, maxLevel) => {
  const nextPos = new Array(maxLevel).fill(GRAPH_PADDING)
  const walk = (node, level) => {
    const { children = [] } = node
    children.forEach((child) => {
      walk(child, level + 1)
    })
    node.x = nextPos[level]
    node.y = GRAPH_PADDING + level * (LEVEL_SEPARATION + NODE_HEIGHT)
    nextPos[level] += NODE_WIDTH + SIBLING_SEPARATION
  }
  walk(root, 0)
  return root
}

const algorithm2 = (root, maxLevel) => {
  let nextPos = GRAPH_PADDING
  const inOrder = (node, level) => {
    const { left, right } = node
    if (left) {
      inOrder(left, level + 1)
    }
    node.x = nextPos
    nextPos += NODE_WIDTH + SIBLING_SEPARATION
    node.y = GRAPH_PADDING + level * (LEVEL_SEPARATION + NODE_HEIGHT)
    if (right) {
      inOrder(right, level + 1)
    }
  }
  inOrder(root, 0)
  return root
}

export const Algorithm1Demo = memo(() => {
  const laidoutRoot = algorithm1(cloneDeep(treeRoot), treeMaxLevel)
  return renderTree(laidoutRoot)
})

Algorithm1Demo.displayName = 'Algorithm1Demo'

export const Algorithm2Demo = memo(() => {
  const laidoutRoot = algorithm2(cloneDeep(binaryRoot), binaryMaxLevel)
  return renderBinaryTree(laidoutRoot)
})

Algorithm2Demo.displayName = 'Algorithm2Demo'
