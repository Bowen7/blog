import Head from 'next/head'
import Script from 'next/script'
export const Comment = ({ title }) => {
  return (
    <>
      <Head>
        <meta property="og:title" content={title} />
      </Head>
      <Script
        src="https://giscus.app/client.js"
        data-repo="Bowen7/blog"
        data-repo-id="MDEwOlJlcG9zaXRvcnkxNjMzODUxNTY="
        data-category="Announcements"
        data-category-id="DIC_kwDOCb0PRM4CUQPF"
        data-mapping="og:title"
        data-strict="1"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="top"
        data-theme="light"
        data-lang="en"
        crossOrigin="anonymous"
        async
      />
      <div className="giscus mt-12"></div>
    </>
  )
}
