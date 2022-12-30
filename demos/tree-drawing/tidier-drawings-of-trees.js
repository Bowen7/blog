import { memo } from 'react'
import cloneDeep from 'lodash/cloneDeep'
import { binaryRoot } from './tree'
import { renderBinaryTree } from './utils'

const MIN_SEPARATION = 1
const TRAlgorithm = (root) => {
  const setup = (node, level, leftmost, rightmost) => {
    let { left, right } = node
    const ll = { addr: null, offset: 0, level: 0 }
    const lr = { addr: null, offset: 0, level: 0 }
    const rl = { addr: null, offset: 0, level: 0 }
    const rr = { addr: null, offset: 0, level: 0 }
    if (left) {
      walk(left, level + 1, ll, lr)
    }
    if (right) {
      walk(right, level + 1, rl, rr)
    }
    node.y = level
    // leaf node
    if (!left && !right) {
      leftmost.addr = node
      rightmost.addr = node
      leftmost.level = level
      rightmost.level = level
      leftmost.offset = 0
      rightmost.offset = 0
      node.offset = 0
    } else {
      let curSep = MIN_SEPARATION
      let rootSep = MIN_SEPARATION
      let leftOffsetSum = 0
      let rightOffsetSum = 0
      while (left && right) {
        if (curSep < MIN_SEPARATION) {
          rootSep += MIN_SEPARATION - curSep
          curSep = MIN_SEPARATION
        }
        if (left.right) {
          leftOffsetSum += left.offset
          curSep -= left.offset
          left = left.right
        } else {
          leftOffsetSum -= left.offset
          curSep += left.offset
          left = left.left
        }
        if (right.left) {
          rightOffsetSum -= right.offset
          curSep -= right.offset
          right = right.left
        } else {
          rightOffsetSum += right.offset
          curSep += right.offset
          right = right.right
        }
      }

      node.offset = (rootSep + 1) / 2
      leftOffsetSum -= node.offset
      rightOffsetSum += node.offset

      if (rl.level > ll.level || !node.left) {
        leftmost.addr = rl.addr
        leftmost.level = rl.level
        leftmost.offset = rl.offset + node.offset
      } else {
        leftmost.addr = ll.addr
        leftmost.level = ll.level
        leftmost.offset = ll.offset - node.offset
      }
      if (lr.level > rr.level || !node.right) {
        rightmost.addr = lr.addr
        rightmost.level = lr.level
        rightmost.offset = lr.offset - node.offset
      } else {
        rightmost.addr = rr.addr
        rightmost.level = rr.level
        rightmost.offset = rr.offset + node.offset
      }

      if (left && left !== node.left) {
        rr.addr.thread = true
        rr.addr.offset = Math.abs(rr.offset + node.offset - rightOffsetSum)
        if (leftOffsetSum - node.offset <= rr.offset) {
          rr.addr.left = left
        } else {
          rr.addr.right = left
        }
      } else if (right && right !== node.right) {
        ll.addr.thread = true
        ll.addr.offset = Math.abs(ll.offset - node.offset - rightOffsetSum)
        if (rightOffsetSum + node.offset >= ll.offset) {
          ll.addr.right = right
        } else {
          ll.addr.left = right
        }
      }
    }
  }
  setup(root, 0)
  return root
}

export const TRAlgorithmDemo = memo(() => {
  const laidoutRoot = TRAlgorithm(cloneDeep(binaryRoot))
  return renderBinaryTree(laidoutRoot)
})

TRAlgorithmDemo.displayName = 'Algorithm1Demo'