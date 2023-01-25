import { lcaMaryRoot } from './tree'
const getLeftmost = (node) => node.children?.[0] ?? node.thread

const getRightmost = (node) => node.children?.[node.children.length - 1] ?? node.thread

const getPreviousSibling = (node) => node.parent?.children?.[node.parent.children.indexOf(node) - 1]

const getFirstChild = (node) => node.children?.[0]

export const lca = (root) => {
  const walk = (node) => {
    const { children = [] } = node
    let defaultAncestor = children[0]
    children.forEach((child) => {
      walk(child)

      const sibling = getPreviousSibling(child)
      if (sibling) {
        let childLeftmost = child
        let childRightmost = child
        let siblingRightmost = sibling
        let firstChild = getFirstChild(childLeftmost)

        let rightmost = getRightmost(siblingRightmost)
        let leftmost = getLeftmost(childLeftmost)
        while (rightmost && leftmost) {
          siblingRightmost = rightmost
          childLeftmost = leftmost
          firstChild = getLeftmost(firstChild)
          childRightmost = getRightmost(childRightmost)
          childRightmost.ancestor = child

          // siblingRightmost child defaultAncestor
          console.log(siblingRightmost, child, defaultAncestor)
          if (siblingRightmost.ancestor?.parent === child.parent) {
            console.log(siblingRightmost.ancestor)
          } else {
            console.log(defaultAncestor)
          }
          leftmost = getLeftmost(childLeftmost)
          rightmost = getRightmost(siblingRightmost)
        }

        if (leftmost && getLeftmost(firstChild)) {
          defaultAncestor = child
        }
      }
    })
  }

  walk(root)
}

lca(lcaMaryRoot)
