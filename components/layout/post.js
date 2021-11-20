import Link from 'next/link'
import Head from 'next/head'
import { MDXProvider } from '@mdx-js/react'
import styled from 'styled-components'
import CodePre from '../code-pre'
import { timeFormat } from '../../utils'
const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.5rem;
  a {
    font-size: 0.875rem;
    color: #696969;
  }
`
const LeftInfo = styled.div``
const components = {
  pre: CodePre
}
function PostLayout({ children, meta = {} }) {
  const { title, time, tags = [] } = meta
  return (
    <article>
      <Head>
        <base target="_blank" rel="noopener noreferrer" />
        <title>{title} - Bowen Codes</title>
      </Head>
      <h1>{title}</h1>
      <Info>
        <LeftInfo>
          <time>{timeFormat(time)}</time>
          {tags.map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </LeftInfo>
        <Link href="/">首页</Link>
      </Info>
      <hr />
      <MDXProvider components={components}>{children}</MDXProvider>
    </article>
  )
}
export default PostLayout
