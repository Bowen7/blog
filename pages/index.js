import Head from 'next/head'
import React from 'react'
import styled from 'styled-components'
import { basename } from 'path'
import Post from '../components/post'

const Year = styled.p`
  color: #434343;
  font-size: 1.25rem;
  margin-left: 0.5rem;
  margin-bottom: 0.5rem;
`

export async function getStaticProps() {
  const sourceContext = require.context('./post', false, /\.mdx$/)
  let metas = sourceContext.keys().map((key) => {
    return { name: basename(key, '.mdx'), ...sourceContext(key).meta }
  })
  metas = metas.filter(({ ready }) => !(ready === false))
  metas.sort(({ time: time1 }, { time: time2 }) => {
    return time2 - time1
  })
  const postYears = []
  let curYear = ''
  metas.forEach((meta) => {
    const { time } = meta
    const year = time.slice(0, 4)
    if (year !== curYear) {
      curYear = year
      postYears.push({
        year,
        posts: []
      })
    }
    postYears[postYears.length - 1].posts.push(meta)
  })
  return {
    props: { postYears }
  }
}
export default function Home({ postYears }) {
  return (
    <>
      <Head>
        <title>Bowen Codes</title>
      </Head>
      {postYears.map(({ year, posts }) => (
        <React.Fragment key={year}>
          <Year>{year}</Year>
          <hr />
          {posts.map((post) => (
            <Post {...post} key={post.name} />
          ))}
        </React.Fragment>
      ))}
    </>
  )
}
