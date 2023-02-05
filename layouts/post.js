import { useRef, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Link from 'next/link'
import Head from 'next/head'
import { MDXProvider } from '@mdx-js/react'
import Balancer from 'react-wrap-balancer'
import { ClipboardIcon, CheckIcon } from '@heroicons/react/24/outline'
import { timeFormat } from 'utils'

const CodePre = ({ children }) => {
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
          <CheckIcon className="w-5 h-5 absolute top-4 right-4" />
        ) : (
          <CopyToClipboard text={text} onCopy={onCopy}>
            <ClipboardIcon className="w-5 h-5 absolute top-4 right-4 cursor-pointer hidden group-hover:inline" />
          </CopyToClipboard>
        )}
        <pre
          ref={ref}
          className="bg-stone-50 p-4 overflow-auto text-sm m-0 [&>code]:bg-stone-50"
        >
          {children}
        </pre>
      </div>
    </>
  )
}

const components = {
  pre: CodePre
}

function PostLayout({ children, meta = {} }) {
  const { title, time, tags = [] } = meta
  return (
    <>
      <article>
        <Head>
          <base target="_blank" rel="noopener noreferrer" />
          <title>{title + ' - Bowen Codes'}</title>
        </Head>
        <h1>
          <Balancer>{title}</Balancer>
        </h1>
        <div className="flex justify-between items-center px-2 mb-2">
          <div>
            <time>{timeFormat(time)}</time>
            {tags.map((tag) => (
              <span
                className="ml-2 text-sm text-stone-500 bg-stone-100 px-2 py-0.5 rounded"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>
          <Link href="/" className="text-sm text-stone-700">
            Home
          </Link>
        </div>
        <hr />
        <MDXProvider components={components}>{children}</MDXProvider>
      </article>
    </>
  )
}
export default PostLayout
