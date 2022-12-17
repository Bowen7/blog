import { memo } from 'react'
import cloneDeep from 'lodash/cloneDeep'
import {
  root as treeRoot,
  maxLevel as treeMaxLevel,
  binaryRoot,
  binaryMaxLevel
} from './tree'
import { renderTree, renderBinaryTree } from './utils'

const algorithm1 = (root, maxLevel) => {
  const nextPos = new Array(maxLevel).fill(0)
  const walk = (node, level) => {
    const { children = [] } = node
    children.forEach((child) => {
      walk(child, level + 1)
    })
    node.x = nextPos[level]
    node.y = level
    nextPos[level] += 1
  }
  walk(root, 0)
  return root
}

const algorithm2 = (root) => {
  let nextPos = 0
  const inOrder = (node, level) => {
    const { left, right } = node
    if (left) {
      inOrder(left, level + 1)
    }
    node.x = nextPos
    nextPos += 1
    node.y = level
    if (right) {
      inOrder(right, level + 1)
    }
  }
  inOrder(root, 0)
  return root
}

const algorithm3 = (root, maxLevel) => {
  const modifier = new Array(maxLevel).fill(0)
  const nextPos = new Array(maxLevel).fill(0)
  let modifierSum = 0
  const firstWalk = (node, level) => {
    const { left, right } = node
    if (left) {
      firstWalk(left, level + 1)
    }
    if (right) {
      firstWalk(right, level + 1)
    }
    const isLeaf = !left && !right
    let place
    if (isLeaf) {
      place = nextPos[level]
    } else if (!left) {
      place = right.x - 1
    } else if (!right) {
      place = left.x + 1
    } else {
      place = (left.x + right.x) / 2
    }
    modifier[level] = Math.max(modifier[level], nextPos[level] - place)
    if (isLeaf) {
      node.x = place
    } else {
      node.x = place + modifier[level]
    }
    nextPos[level] = node.x + 2
    node.modifier = modifier[level]
  }

  const secondWalk = (node, level) => {
    const { left, right } = node
    node.x += modifierSum
    modifierSum += node.modifier
    node.y = level
    if (left) {
      secondWalk(left, level + 1)
    }
    if (right) {
      secondWalk(right, level + 1)
    }
    modifierSum -= node.modifier
  }

  firstWalk(root, 0)
  secondWalk(root, 0)
  return root
}

export const Algorithm1Demo = memo(() => {
  const laidoutRoot = algorithm1(cloneDeep(treeRoot), treeMaxLevel)
  return renderTree(laidoutRoot)
})
Algorithm1Demo.displayName = 'Algorithm1Demo'

export const Algorithm2Demo = memo(() => {
  const laidoutRoot = algorithm2(cloneDeep(binaryRoot))
  return renderBinaryTree(laidoutRoot)
})
Algorithm2Demo.displayName = 'Algorithm2Demo'

export const Algorithm3Demo = memo(() => {
  const laidoutRoot = algorithm3(cloneDeep(binaryRoot), binaryMaxLevel)
  return renderBinaryTree(laidoutRoot)
})
Algorithm3Demo.displayName = 'Algorithm3Demo'
