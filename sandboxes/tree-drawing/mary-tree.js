import { Fragment } from 'react'

const UNIT_SIZE = 25
const GRAPH_PADDING = 25
const FONT_SIZE = 18

const NODE_WIDTH = 1
const NODE_HEIGHT = 1

export const root = {
  title: 'r',
  children: [
    {
      title: 'e',
      children: [
        { title: 'a' },
        { title: 'd', children: [{ title: 'b' }, { title: 'c' }] }
      ]
    },
    { title: 'f' },
    {
      title: 'n',
      children: [
        { title: 'g' },
        {
          title: 'm',
          children: [
            { title: 'h' },
            { title: 'i' },
            { title: 'j' },
            { title: 'k' },
            { title: 'l' }
          ]
        }
      ]
    },
    { title: 'q', children: [{ title: 'p', children: [{ title: 'o' }] }] }
  ]
}
export const level = 5

const getRealLength = (unitLength) => unitLength * UNIT_SIZE

const renderNodesAndEdges = (nodes, edges, width, height, xAdjustment = 0) => (
  <svg
    width={width * UNIT_SIZE + GRAPH_PADDING * 2}
    height={height * UNIT_SIZE + GRAPH_PADDING * 2}
  >
    <g
      transform={`translate(${
        xAdjustment * UNIT_SIZE + GRAPH_PADDING
      }, ${GRAPH_PADDING})`}
    >
      {edges.map(({ x1, y1, x2, y2, key }) => (
        <path
          d={`M${getRealLength(x1 + NODE_WIDTH / 2)},${getRealLength(
            y1 + NODE_HEIGHT / 2
          )}L${getRealLength(x2 + NODE_WIDTH / 2)},${getRealLength(
            y2 + NODE_HEIGHT / 2
          )}`}
          key={key}
          stroke="#000"
          strokeWidth={2}
          fill="none"
        />
      ))}
      {nodes.map(({ x, y, title }) => (
        <Fragment key={title}>
          <circle
            cx={getRealLength(x + NODE_WIDTH / 2)}
            cy={getRealLength(y + NODE_HEIGHT / 2)}
            r={getRealLength(NODE_WIDTH / 2)}
            stroke="black"
            strokeWidth="2"
            fill="#fff"
          />
          <text
            x={getRealLength(x + NODE_WIDTH / 2)}
            y={getRealLength(y + NODE_HEIGHT / 2)}
            r={getRealLength(NODE_HEIGHT / 2)}
            textAnchor="middle"
            fontSize={FONT_SIZE}
            dy={FONT_SIZE / 3}
          >
            {title}
          </text>
        </Fragment>
      ))}
    </g>
  </svg>
)

export const renderTree = (root) => {
  const nodes = []
  const edges = []
  const stack = [root]
  let maxX = 0
  let maxY = 0
  let minX = Infinity
  while (stack.length > 0) {
    const cur = stack.pop()
    const { title, children = [], x, y } = cur

    minX = Math.min(minX, x)
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
  return renderNodesAndEdges(
    nodes,
    edges,
    maxX - minX + NODE_WIDTH,
    maxY + NODE_HEIGHT,
    -minX
  )
}
