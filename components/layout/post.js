import Link from 'next/link'
import Head from 'next/head'
import { MDXProvider } from '@mdx-js/react'
import Balancer from 'react-wrap-balancer'
import CodePre from '../code-pre'
import { timeFormat } from '../../utils'
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
