import { Fragment } from 'react'
export const NODE_WIDTH = 30
export const NODE_HEIGHT = 30
export const SIBLING_SEPARATION = 25
export const LEVEL_SEPARATION = 50
export const GRAPH_PADDING = 10
const FONT_SIZE = 18

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

  return (
    <svg
      width={maxX + GRAPH_PADDING + NODE_WIDTH}
      height={maxY + GRAPH_PADDING + NODE_HEIGHT}
    >
      {nodes.map(({ x, y, title }) => (
        <Fragment key={title}>
          <circle
            cx={x + NODE_WIDTH / 2}
            cy={y + NODE_HEIGHT / 2}
            r={NODE_WIDTH / 2}
            stroke="black"
            strokeWidth="2"
            fill="none"
          />
          <text
            x={x + NODE_WIDTH / 2}
            y={y + NODE_HEIGHT / 2}
            r={NODE_HEIGHT / 2}
            textAnchor="middle"
            fontSize={FONT_SIZE}
            dy={FONT_SIZE / 3}
          >
            {title}
          </text>
        </Fragment>
      ))}
      {edges.map(({ x1, y1, x2, y2, key }) => (
        <path
          d={`M${x1 + NODE_WIDTH / 2},${y1 + NODE_HEIGHT}L${
            x2 + NODE_WIDTH / 2
          },${y2}`}
          key={key}
          stroke="#000"
          strokeWidth={2}
          fill="none"
        />
      ))}
    </svg>
  )
}
