import Link from 'next/link'
import Head from 'next/head'
import { MDXProvider } from '@mdx-js/react'
import Balancer from 'react-wrap-balancer'
import { timeFormat } from 'utils'
import { CodeBlock } from './code-block'
import { Comment } from 'layouts/comment'

const components = {
  pre: CodeBlock
}

function PostLayout({ children, meta = {} }) {
  const { title, time, tags = [], description } = meta
  return (
    <>
      <article>
        <Head>
          <base target="_blank" rel="noopener noreferrer" />
          <title>{title}</title>
          <meta name="og:title" content={title} />
          {description ? (
            <meta name="og:description" content={description} />
          ) : (
            <meta name="og:description" content="A blog written by Bowen" />
          )}
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
          <Link href="/" className="text-sm text-black">
            Home
          </Link>
        </div>
        <hr />
        <MDXProvider components={components}>{children}</MDXProvider>
        <Comment />
      </article>
    </>
  )
}
export default PostLayout
