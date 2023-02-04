import { useRef, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const copySrc = '/icons/copy.svg'
const copiedSrc = '/icons/done.svg'
function CodePre({ children, ...restProps }) {
  const [isCopied, setIsCopied] = useState(false)
  const ref = useRef()
  const text = ref.current?.textContent

  const onCopy = () => {
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 3000)
  }

  return (
    <>
      <div className="code-wrapper">
        {isCopied ? (
          <img className="copy" src={copiedSrc} />
        ) : (
          <CopyToClipboard text={text} onCopy={onCopy}>
            <img className="copy" src={copySrc} />
          </CopyToClipboard>
        )}
        <pre className="code-pre" ref={ref}>
          {children}
        </pre>
        {/* )} */}
      </div>
      <style jsx>{`
        .code-wrapper {
          position: relative;
          border-radius: 6px;
          margin-bottom: 1em;
        }
        .copy {
          display: none;
          width: 1em;
          height: 1em;
          position: absolute;
          top: 0.5em;
          right: 0.5em;
          // reset
          max-width: initial;
          cursor: pointer;
        }
        .code-wrapper:hover > .copy {
          display: inline;
        }
        .code-pre,
        .code > :global(pre) {
          background-color: #f9f9f9 !important;
          padding: 1em;
          overflow: auto;
          font-size: 14px;
          margin: 0;
        }
      `}</style>
    </>
  )
}
export default CodePre
