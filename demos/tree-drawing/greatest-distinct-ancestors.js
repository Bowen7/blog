import { maryRoot } from './tree'
const getLeftmost = (node) => node.children?.[0] ?? node.thread

const getRightmost = (node) =>
  node.children?.[node.children.length - 1] ?? node.thread

const getPreviousSibling = (node) =>
  node.parent?.children?.[node.parent.children.indexOf(node) - 1]

const getFirstChild = (node) => node.children?.[0]

export const greatestDistinctAncestors = (root) => {
  const apportion = (v, defaultAncestor) => {
    const w = getPreviousSibling(v)
    if (w) {
      let vip = v
      let vop = v
      let vim = w
      let vom = getFirstChild(vip.parent)

      let nr = getRightmost(vim)
      let nl = getLeftmost(vip)

      while (nr && nl) {
        vim = nr
        vip = nl
        vom = getLeftmost(vom)
        vop = getRightmost(vop)
        vop.ancestor = v

        // vim v defaultAncestor
        // console.log(vim.title, v.title, defaultAncestor.title)
        if (vim.ancestor?.parent === v.parent) {
          // console.log(1, vim.ancestor.title)
        } else {
          // console.log(2, defaultAncestor.title)
        }
        nl = getLeftmost(vip)
        nr = getRightmost(vim)
      }
      if (nr && !getRightmost(vop)) {
        console.log(11, v.title, vop.title, nr.title)
        vop.thread = nr
      }
      if (nl && !getLeftmost(vom)) {
        console.log(22, vom.title, nl.title)
        vom.thread = nl
        defaultAncestor = v
      }
    }
    return defaultAncestor
  }

  const walk = (node) => {
    const { children = [] } = node
    let defaultAncestor = children[0]
    children.forEach((child) => {
      child.parent = node
      walk(child)

      defaultAncestor = apportion(child, defaultAncestor)
    })
  }

  walk(root)
}

greatestDistinctAncestors(maryRoot)
