import { useRef, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const copySrc = '/icons/copy.svg'
const copiedSrc = '/icons/done.svg'
function CodePre({ children }) {
  const [isCopied, setIsCopied] = useState(false)
  const ref = useRef()
  const text = ref.current?.textContent

  const onCopy = () => {
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 3000)
  }

  return (
    <>
      <div className="relative rounded-md mb-4 group">
        {isCopied ? (
          <img className="w-4 h-4 absolute top-2 right-2" src={copiedSrc} />
        ) : (
          <CopyToClipboard text={text} onCopy={onCopy}>
            <img
              className="w-4 h-4 absolute top-2 right-2 cursor-pointer hidden group-hover:inline"
              src={copySrc}
            />
          </CopyToClipboard>
        )}
        <pre ref={ref} className="bg-gray-50 p-4 overflow-auto text-sm m-0">
          {children}
        </pre>
      </div>
    </>
  )
}
export default CodePre
