const NODE_WIDTH = 1
const NODE_HEIGHT = 1
const LEVEL_SEPARATION = 1
const SIBLING_SEPARATION = 1

export default function layout(root) {
  let nextPos = 0
  const walk = (node, level) => {
    const { left, right } = node
    if (left) {
      walk(left, level + 1)
    }
    node.x = nextPos
    nextPos += NODE_WIDTH + SIBLING_SEPARATION
    node.y = level * (LEVEL_SEPARATION + NODE_HEIGHT)
    if (right) {
      walk(right, level + 1)
    }
  }
  walk(root, 0)
  return root
}
