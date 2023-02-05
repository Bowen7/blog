import { useRef, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Link from 'next/link'
import Head from 'next/head'
import { MDXProvider } from '@mdx-js/react'
import Balancer from 'react-wrap-balancer'
import { timeFormat } from 'utils'

const copySrc = '/icons/copy.svg'
const copiedSrc = '/icons/done.svg'
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
          <img className="w-4 h-4 absolute top-2 right-2" src={copiedSrc} />
        ) : (
          <CopyToClipboard text={text} onCopy={onCopy}>
            <img
              className="w-4 h-4 absolute top-2 right-2 cursor-pointer hidden group-hover:inline"
              src={copySrc}
            />
          </CopyToClipboard>
        )}
        <pre ref={ref} className="bg-stone-50 p-4 overflow-auto text-sm m-0">
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
                className="ml-2 text-sm text-stone-500 bg-stone-100 px-2 py-1 rounded"
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
