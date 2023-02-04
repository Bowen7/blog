import Link from 'next/link'
import { timeFormat } from '../../utils'

const Post = ({ time, title, name, tags = [] }) => (
  <>
    <div className="post">
      <div className="title-container">
        <Link key={title} href={'/post/' + name} passHref>
          {title}
        </Link>
        {tags.map((tag) => (
          <span className="tag" key={tag}>
            {tag}
          </span>
        ))}
      </div>
      <time>{timeFormat(time)}</time>
    </div>
    <style jsx>{`
      .post {
        margin-left: 0.5rem;
        margin-bottom: 1.5rem;
      }
      .title-container {
        display: flex;
        flex-direction: row;
        align-items: center;
      }
      .title {
        text-decoration: none;
      }
    `}</style>
  </>
)

export default Post
