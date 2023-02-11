const NODE_WIDTH = 1
const NODE_HEIGHT = 1
const LEVEL_SEPARATION = 1
const SIBLING_SEPARATION = 1

export default function layout(root, maxLevel) {
  const nextPos = new Array(maxLevel).fill(0)
  const walk = (node, level) => {
    const { children = [] } = node
    children.forEach((child) => {
      walk(child, level + 1)
    })
    node.x = nextPos[level]
    node.y = level * (LEVEL_SEPARATION + NODE_HEIGHT)
    nextPos[level] += SIBLING_SEPARATION + NODE_WIDTH
  }
  walk(root, 0)
  return root
}
