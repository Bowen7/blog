const NODE_WIDTH = 1
const NODE_HEIGHT = 1
const LEVEL_SEPARATION = 1
const SIBLING_SEPARATION = 1

export default function layout(root, maxLevel) {
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
      place = right.x - (NODE_WIDTH + SIBLING_SEPARATION) / 2
    } else if (!right) {
      place = left.x + (NODE_WIDTH + SIBLING_SEPARATION) / 2
    } else {
      place = (left.x + right.x) / 2
    }
    modifier[level] = Math.max(modifier[level], nextPos[level] - place)
    if (isLeaf) {
      node.x = place
    } else {
      node.x = place + modifier[level]
    }
    nextPos[level] = node.x + NODE_WIDTH + SIBLING_SEPARATION
    node.modifier = modifier[level]
  }

  const secondWalk = (node, level) => {
    const { left, right } = node
    node.x += modifierSum
    modifierSum += node.modifier
    node.y = level * (LEVEL_SEPARATION + NODE_HEIGHT)
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
