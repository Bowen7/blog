import { useState, useRef } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import clsx from 'clsx'
import { Clipboard, ClipboardCheck } from 'lucide-react'

const sizeClassMap = {
  sm: 'max-h-52',
  md: 'max-h-72',
  lg: 'max-h-96',
  xl: 'max-h-144'
}

const getMaxHeightByLines = (lines) => {
  if (lines <= 15) return sizeClassMap.sm
  if (lines <= 20) return sizeClassMap.md
  if (lines <= 35) return sizeClassMap.lg
  return sizeClassMap.xl
}

export const CodeBlock = ({ children, 'data-language': language = '' }) => {
  const lines = children?.props?.children?.length ?? 20

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
            <ClipboardCheck className="w-5 h-5" />
          ) : (
            <CopyToClipboard text={text} onCopy={onCopy}>
              <Clipboard className="w-5 h-5 cursor-pointer" />
            </CopyToClipboard>
          )}
        </div>
        <div className={clsx('overflow-auto', getMaxHeightByLines(lines))}>
          <pre ref={ref} className="p-4 text-sm inline-block">
            {children}
          </pre>
        </div>
      </div>
    </>
  )
}
