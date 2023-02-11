import { useState, useRef } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { ClipboardIcon, CheckIcon } from '@heroicons/react/24/outline'

export const Pre = ({ children, 'data-language': language = '' }) => {
  const [isCopied, setIsCopied] = useState(false)
  const ref = useRef()
  const text = ref.current?.textContent

  const onCopy = () => {
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 3000)
  }

  return (
    <>
      <div className="relative my-6 rounded-lg shadow-lg divide-y">
        <div className="flex items-center justify-between px-4 py-2">
          <span>{language.toUpperCase()}</span>
          {isCopied ? (
            <CheckIcon className="w-5 h-5" />
          ) : (
            <CopyToClipboard text={text} onCopy={onCopy}>
              <ClipboardIcon className="w-5 h-5 cursor-pointer" />
            </CopyToClipboard>
          )}
        </div>
        <div className="overflow-auto max-h-72">
          <pre ref={ref} className="p-4 text-sm inline-block">
            {children}
          </pre>
        </div>
      </div>
    </>
  )
}
