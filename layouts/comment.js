import Giscus from '@giscus/react'
export const Comment = () => {
  return (
    <div className="mt-8">
      <Giscus
        repo="Bowen7/blog"
        repoId="MDEwOlJlcG9zaXRvcnkxNjMzODUxNTY="
        category="Announcements"
        categoryId="DIC_kwDOCb0PRM4CUQPF"
        mapping="title"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="light"
        lang="en"
        loading="lazy"
      />
    </div>
  )
}
