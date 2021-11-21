import Link from 'next/link'
import Head from 'next/head'
import { MDXProvider } from '@mdx-js/react'
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
          <title>{title} - Bowen Codes</title>
        </Head>
        <h1>{title}</h1>
        <div className="info">
          <div>
            <time>{timeFormat(time)}</time>
            {tags.map((tag) => (
              <span className="tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
          <Link href="/">首页</Link>
        </div>
        <hr />
        <MDXProvider components={components}>{children}</MDXProvider>
      </article>
      <style jsx>{`
        .info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 0.5rem;
        }
        .info > :global(a) {
          font-size: 0.875rem;
          color: #696969;
        }
      `}</style>
    </>
  )
}
export default PostLayout
