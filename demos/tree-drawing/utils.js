import { Fragment } from 'react'
export const WIDTH = 1
export const HEIGHT = 1
export const SIBLING_SEPARATION = 1
export const LEVEL_SEPARATION = 1

export const renderTree = (root) => {
  const nodes = []
  const edges = []
  const stack = [root]
  while (stack.length > 0) {
    const cur = stack.pop()
    const { title, children, x, y } = cur
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
    <svg>
      {nodes.map(({ x, y, title }) => (
        <Fragment key={title}>
          <circle cx={x} cy={y} r={WIDTH} />
          <text cx={x} cy={y} r={WIDTH}>
            {title}
          </text>
        </Fragment>
      ))}
      {edges.map(({ x1, y1, x2, y2, key }) => (
        <path path={`M${x1},${y1}L${x2},${y2}`} key={key} />
      ))}
    </svg>
  )
}
