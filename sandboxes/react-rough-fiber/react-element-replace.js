export const code1 = /* jsx */ `
import { Replacer } from "react-element-replace"
export default function App() {
  return (
    <Replacer
      matchElement="span"
      replace={(item) => <span {...item.props} style={{ color: '#85A600' }} />}
    >
      <div>
        <span>span</span>
        <p>p</p>
      </div>
    </Replacer>
  )
}
`.trim()

export const code2 = /* jsx */ `
import { memo } from "react"
import { Replacer } from "react-element-replace"

const Memo = memo(() => (
	<div>
		<span>span</span>
		<p>p</p>
	</div>
))

export default function App() {
  return (
    <Replacer
      matchElement="span"
      replace={(item) => <span {...item.props} style={{ color: '#85A600' }} />}
    >
      <Memo />
    </Replacer>
  )
}
`.trim()
