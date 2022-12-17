import { Fragment } from 'react'
export const NODE_WIDTH = 30
export const NODE_HEIGHT = 30
export const SIBLING_SEPARATION = 25
export const LEVEL_SEPARATION = 50
export const GRAPH_PADDING = 10
const FONT_SIZE = 18

const getX = (x) =>
  (x + 1) * NODE_WIDTH + x * +SIBLING_SEPARATION + GRAPH_PADDING
const getY = (y) => (y + 1) * NODE_HEIGHT + y * LEVEL_SEPARATION + GRAPH_PADDING

const renderNodesAndEdges = (nodes, edges, maxX, maxY) => (
  <svg
    width={getX(maxX) + GRAPH_PADDING + NODE_WIDTH}
    height={getY(maxY) + GRAPH_PADDING + NODE_HEIGHT}
  >
    {edges.map(({ x1, y1, x2, y2, key }) => (
      <path
        d={`M${getX(x1) + NODE_WIDTH / 2},${getY(y1) + NODE_HEIGHT / 2}L${
          getX(x2) + NODE_WIDTH / 2
        },${getY(y2) + NODE_HEIGHT / 2}`}
        key={key}
        stroke="#000"
        strokeWidth={2}
        fill="none"
      />
    ))}
    {nodes.map(({ x, y, title }) => (
      <Fragment key={title}>
        <circle
          cx={getX(x) + NODE_WIDTH / 2}
          cy={getY(y) + NODE_HEIGHT / 2}
          r={NODE_WIDTH / 2}
          stroke="black"
          strokeWidth="2"
          fill="#fff"
        />
        <text
          x={getX(x) + NODE_WIDTH / 2}
          y={getY(y) + NODE_HEIGHT / 2}
          r={NODE_HEIGHT / 2}
          textAnchor="middle"
          fontSize={FONT_SIZE}
          dy={FONT_SIZE / 3}
        >
          {title}
        </text>
      </Fragment>
    ))}
  </svg>
)

export const renderTree = (root) => {
  const nodes = []
  const edges = []
  const stack = [root]
  let maxX = 0
  let maxY = 0
  while (stack.length > 0) {
    const cur = stack.pop()
    const { title, children = [], x, y } = cur
    maxX = Math.max(maxX, x)
    maxY = Math.max(maxY, y)
    nodes.push({ title, x, y })
    children.forEach((child) => {
      const { x: x2, y: y2, title: childTitle } = child
      stack.push(child)
      edges.push({
        x1: x,
        y1: y,
        x2,
        y2,
        key: `${title}-${childTitle}`
      })
    })
  }

  return renderNodesAndEdges(nodes, edges, maxX, maxY)
}

export const renderBinaryTree = (root) => {
  const nodes = []
  const edges = []
  const stack = [root]
  let maxX = 0
  let maxY = 0
  while (stack.length > 0) {
    const cur = stack.pop()
    const { title, left, right, x, y } = cur
    maxX = Math.max(maxX, x)
    maxY = Math.max(maxY, y)
    nodes.push({ title, x, y })

    if (left) {
      const { x: x2, y: y2, title: childTitle } = left
      stack.push(left)
      edges.push({
        x1: x,
        y1: y,
        x2,
        y2,
        key: `${title}-${childTitle}`
      })
    }
    if (right) {
      const { x: x2, y: y2, title: childTitle } = right
      stack.push(right)
      edges.push({
        x1: x,
        y1: y,
        x2,
        y2,
        key: `${title}-${childTitle}`
      })
    }
  }

  return renderNodesAndEdges(nodes, edges, maxX, maxY)
}
