const isLeaf = (node) => node.children?.length === 0

const hasLeftSibling = (node) => node.parent?.children.indexOf(node) > 0

const getLeftSibling = (node) =>
  node.parent.children[node.parent.children.indexOf(node) - 1]

// unit length
const WIDTH = 1
const MIN_SEPARATION = 1

export const walkerAlgorithm = (root) => {
  const apportion = (node, level) => {}

  const firstWalk = (node, level) => {
    node.modifier = 0
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
