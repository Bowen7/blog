import { useRouter } from 'next/router'
import Header from './header'

function Layout(props) {
  const { children } = props
  const router = useRouter()
  const page = router.pathname.split('/')[1]
  return (
    <>
      <div className="main">
        <Header page={page} />
        {/* eslint-disable-next-line multiline-ternary */}
        {page === 'post' ? (
          children
        ) : (
          <>
            <title>Bowen Codes</title>
            {children}
          </>
        )}
      </div>
      <style jsx>{`
        .main {
          max-width: 60ch;
          margin: 0 auto 5rem auto;
        }
      `}</style>
    </>
  )
}
export default Layout
