const NODE_WIDTH = 1
const NODE_HEIGHT = 1
const LEVEL_SEPARATION = 1
const SIBLING_SEPARATION = 1

const getLeftmost = (node) => node.children?.[0] ?? node.thread
const getRightmost = (node) =>
  node.children?.[node.children.length - 1] ?? node.thread

const getPreviousSibling = (node) => node.previousSibling

const getAncestor = (leftTreeRightmost, node, defaultAncestor) =>
  node.parent === leftTreeRightmost.ancestor?.parent
    ? leftTreeRightmost.ancestor
    : defaultAncestor

const moveSubTree = (ancestor, node, shift) => {
  const subtrees = node.num - ancestor.num
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
      parentFirstChildLeftmost = getLeftmost(parentFirstChildLeftmost)
      rightTreeRightmost = getRightmost(rightTreeRightmost)

      rightTreeRightmost.ancestor = node
      const shift =
        leftTreeRightmost.prelim +
        leftTreeRightmostModSum -
        (rightTreeLeftmost.prelim + rightTreeLeftmostModSum) +
        SIBLING_SEPARATION +
        NODE_WIDTH
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
      rightTreeRightmost.mod +=
        leftTreeRightmostModSum - rightTreeRightmostModSum
    }
    if (nextLeftmost && !getLeftmost(parentFirstChildLeftmost)) {
      parentFirstChildLeftmost.thread = nextLeftmost
      parentFirstChildLeftmost.mod +=
        rightTreeLeftmostModSum - parentFirstChildLeftmostModSum
      defaultAncestor = node
    }
  }
  return defaultAncestor
}

const executeShifts = (node) => {
  let shift = 0
  let change = 0
  const { children = [] } = node
  for (let i = children.length - 1; i >= 0; i--) {
    const child = children[i]
    child.prelim += shift
    child.mod += shift
    change += child.change
    shift += child.shift + change
  }
}

const firstWalk = (node) => {
  const { children = [], previousSibling } = node
  node.prelim = 0
  node.mod = 0
  node.change = 0
  node.shift = 0

  if (children.length > 0) {
    let defaultAncestor = children[0]
    children.forEach((child, index) => {
      child.num = index
      child.parent = node
      if (index > 0) {
        child.previousSibling = children[index - 1]
      }
      firstWalk(child)
      defaultAncestor = apportion(child, defaultAncestor)
    })
    executeShifts(node)
    const leftmost = children[0]
    const rightmost = children[children.length - 1]
    const midpoint = (leftmost.prelim + rightmost.prelim) / 2
    if (previousSibling) {
      node.prelim = previousSibling.prelim + SIBLING_SEPARATION + NODE_WIDTH
      node.mod = node.prelim - midpoint
    } else {
      node.prelim = midpoint
    }
  } else {
    if (previousSibling) {
      node.prelim = previousSibling.prelim + SIBLING_SEPARATION + NODE_WIDTH
    }
  }
}

const secondWalk = (node, mod, level) => {
  node.x = node.prelim + mod
  node.y = level * (LEVEL_SEPARATION + NODE_HEIGHT)
  node.children?.forEach((child) =>
    secondWalk(child, mod + node.mod, level + 1)
  )
}

export const layout = (root) => {
  firstWalk(root)
  secondWalk(root, 0, 0)
  return root
}
