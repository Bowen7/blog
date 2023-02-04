import { useRouter } from 'next/router'
import Header from './header'

function Layout(props) {
  const { children } = props
  const router = useRouter()
  const page = router.pathname.split('/')[1]
  return (
    <>
      <div className="main-page max-w-4xl mb-20 mx-auto">
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
    </>
  )
}
export default Layout
