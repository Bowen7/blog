import Head from 'next/head'
import React from 'react'
import { basename, resolve } from 'path'
import fs from 'fs'
import Post from '../components/post'

const extractMeta = (source) => {
  const metaRegex =
    /export(\s|\n)+const(\s|\n)+meta(\s|\n)+=(\s|\n)+({[\s\S]*?})(\s|\n)+/
  const matches = source.match(metaRegex)
  try {
    // eslint-disable-next-line no-eval
    return eval('(' + matches[5] + ')')
  } catch (error) {
    return {}
  }
}

export async function getStaticProps() {
  const postDirPath = resolve(process.cwd(), './pages/post')
  const files = fs.readdirSync(postDirPath)
  const metas = await Promise.all(
    files.map(async (file) => {
      const source = fs.readFileSync(resolve(postDirPath, file)).toString()
      const meta = extractMeta(source)
      return {
        name: basename(file, '.mdx'),
        ...meta
      }
    })
  )
  metas.sort(({ time: time1 }, { time: time2 }) => {
    return time2 - time1
  })
  const postYears = []
  let curYear = ''
  metas.forEach((meta) => {
    const time = meta.time
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

export default function Home({ postYears = [] }) {
  return (
    <>
      <Head>
        <title>Bowen Codes</title>
      </Head>
      {postYears.map(({ year, posts }) => (
        <React.Fragment key={year}>
          <p className="year">{year}</p>
          <hr />
          {posts.map((post) => (
            <Post {...post} key={post.name} />
          ))}
        </React.Fragment>
      ))}
      <style jsx>{`
        .year {
          color: #434343;
          font-size: 1.25rem;
          margin-left: 0.5rem;
          margin-bottom: 0.5rem;
        }
      `}</style>
    </>
  )
}
