import { useEffect, useRef, useState } from 'react'
import Clipboard from 'clipboard'
import * as shiki from 'shiki/dist/index.js'
const SHIKI_CDN = 'https://cdn.jsdelivr.net/npm/shiki@0.9.12/'
const THEME = 'min-light'
const copySrc = '/icons/copy.svg'
const doneSrc = '/icons/done.svg'
function CodePre({ children }) {
  const [svgSrc, setSvgSrc] = useState(copySrc)
  const ref = useRef()
  const clipboard = useRef()
  const lock = useRef(false)
  const [codeHtml, setCodeHtml] = useState('')

  const code = children.props.children || ''
  useEffect(() => {
    if (ref.current) {
      clipboard.current = new Clipboard(ref.current)
      clipboard.current.on('success', () => {
        if (!lock.current) {
          lock.current = true
          setSvgSrc(doneSrc)

          setTimeout(() => {
            setSvgSrc(svgSrc)
            lock.current = false
          }, 1500)
        }
      })
    }
  }, [])

  useEffect(() => {
    const childrenProps = children.props
    const language = /language-(\w+)/.exec(childrenProps.className || '')[1]
    shiki.setCDN(SHIKI_CDN)
    shiki
      .getHighlighter({
        theme: THEME,
        langs: [language]
      })
      .then((highlighter) => {
        const codeHtml = highlighter.codeToHtml(
          childrenProps.children,
          language
        )
        setCodeHtml(codeHtml)
      })
  }, [])
  return (
    <>
      <div className="code-wrapper">
        <img
          className="copy"
          ref={ref}
          src={svgSrc}
          data-clipboard-text={code}
        />
        {codeHtml ? (
          <div
            className="code"
            dangerouslySetInnerHTML={{ __html: codeHtml }}
          />
        ) : (
          <pre className="code-pre">{children}</pre>
        )}
      </div>
      <style jsx>{`
        .code-wrapper {
          position: relative;
        }
        .copy {
          display: none;
          width: 1rem;
          height: 1rem;
          position: absolute;
          top: 0;
          right: 0rem;
          // reset
          max-width: initial;
          cursor: pointer;
        }
        .code-wrapper:hover > .copy {
          display: inline;
        }
        .code-pre,
        .code > :global(pre) {
          padding: 1em 1em 0 1em;
          overflow: auto;
          font-size: 14px;
          margin: 0;
        }
      `}</style>
    </>
  )
}
export default CodePre
