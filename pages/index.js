import Head from 'next/head'
import React from 'react'
import Link from 'next/link'
import { basename, resolve } from 'path'
import fs from 'fs'
import { timeFormat } from 'utils'

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
  const postsByYear = []
  let curYear = ''
  metas.forEach((meta) => {
    const time = meta.time
    const year = time.slice(0, 4)
    if (year !== curYear) {
      curYear = year
      postsByYear.push({
        year,
        posts: []
      })
    }
    postsByYear[postsByYear.length - 1].posts.push(meta)
  })
  return {
    props: { postsByYear }
  }
}

const Post = ({ time, title, name, tags = [] }) => (
  <>
    <div className="ml-2 mb-6">
      <div>
        <Link
          key={title}
          href={'/post/' + name}
          passHref
          className="no-underline"
        >
          {title}
        </Link>
      </div>
      <div className="mt-1">
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
    </div>
  </>
)

export default function Home({ postsByYear = [] }) {
  return (
    <>
      <Head>
        <title>Bowen Codes</title>
      </Head>
      {postsByYear.map(({ year, posts }) => (
        <React.Fragment key={year}>
          <p className="text-black text-lg ml-2 mb-2">{year}</p>
          <hr className="mb-4" />
          {posts.map((post) => (
            <Post {...post} key={post.name} />
          ))}
        </React.Fragment>
      ))}
    </>
  )
}
