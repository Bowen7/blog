const isLeaf = (node) => node.children?.length === 0

const hasLeftSibling = (node) => node.parent?.children.indexOf(node) > 0

const hasRightSibling = (node) =>
  node.parent.children.indexOf(node) < node.parent.children.length - 1

const getLeftSibling = (node) =>
  node.parent.children[node.parent.children.indexOf(node) - 1]

const getRightSibling = (node) =>
  node.parent.children[node.parent.children.indexOf(node) + 1]

const getLeftNeighbor = (node) => node.neighbor

const getLeftmost = (node, level, depth) => {
  if (level >= depth) {
    return node
  } else if (isLeaf(node)) {
    return null
  } else {
    let rightmost = node.children[0]
    let leftmost = getLeftmost(rightmost, level + 1, depth)
    while (!leftmost && hasRightSibling(rightmost)) {
      rightmost = getRightSibling(rightmost)
      leftmost = getLeftmost(rightmost, level + 1, depth)
    }
    return leftmost
  }
}

// unit length
const WIDTH = 1
const MIN_SEPARATION = 1

export const walkerAlgorithm = (root) => {
  const neighbors = []
  let maxDepth = 0

  const apportion = (node, level) => {
    let leftmost = node.children[0]
    const neighbor = getLeftNeighbor(leftmost)
    let compareDepth = 1
    const depthToStop = maxDepth - level
    while (leftmost && compareDepth <= depthToStop) {
      let leftModSum = 0
      let rightModSum = 0
      let ancestorLeftmost = leftmost
      let ancestorNeighbor = neighbor
      for (let i = 0; i < compareDepth; i++) {
        ancestorLeftmost = ancestorLeftmost.parent
        ancestorNeighbor = ancestorNeighbor.parent
        rightModSum += ancestorLeftmost.modifier
        leftModSum += ancestorNeighbor.modifier
      }
      let moveDistance =
        neighbor.prelim +
        leftModSum +
        MIN_SEPARATION +
        WIDTH -
        (leftmost.prelim + rightModSum)
      if (moveDistance > 0) {
        let tempPtr = node
        let leftSiblings = 0
        while (tempPtr && tempPtr !== ancestorLeftmost) {
          leftSiblings++
          tempPtr = getLeftSibling(tempPtr)
        }
        if (tempPtr) {
          const portion = moveDistance / leftSiblings
          tempPtr = node
          while (tempPtr !== ancestorLeftmost) {
            tempPtr.prelim += moveDistance
            tempPtr.modifier += moveDistance
            moveDistance -= portion
            tempPtr = getLeftSibling(tempPtr)
          }
        }
      }

      compareDepth++
      if (isLeaf(leftmost)) {
        leftmost = getLeftmost(node, 0, compareDepth)
      } else {
        leftmost = leftmost.children[0]
      }
    }
  }

  const firstWalk = (node, level) => {
    node.neighbor = neighbors[level]
    neighbors[level] = node
    node.modifier = 0
    maxDepth = Math.max(level, maxDepth)

    if (isLeaf(node)) {
      if (hasLeftSibling(node)) {
        node.prelim = getLeftSibling(node).prelim + MIN_SEPARATION + WIDTH
      } else {
        node.prelim = 0
      }
    } else {
      const { children } = node
      const leftmost = children[0]
      const rightmost = children[children.length - 1]
      children.forEach((child) => firstWalk(child, level + 1))
      const midPoint = (leftmost.prelim + rightmost.prelim) / 2
      if (hasLeftSibling(node)) {
        const leftSibling = getLeftSibling(node)
        node.prelim = leftSibling.prelim + MIN_SEPARATION + WIDTH
        node.modifier = node.prelim - midPoint
        apportion(node, level)
      } else {
        node.prelim = midPoint
      }
    }
  }

  const secondWalk = (node, level, modSum) => {}

  firstWalk(root, 0)
  secondWalk(root, 0, 0)
}
