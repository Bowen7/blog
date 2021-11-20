import { useRouter } from 'next/router'
import styled from 'styled-components'
import Header from './header'
const Main = styled.div`
  max-width: 60ch;
  margin: 0 auto 5rem auto;
`

function Layout(props) {
  const { children } = props
  const router = useRouter()
  const page = router.pathname.split('/')[1]
  return (
    <Main>
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
    </Main>
  )
}
export default Layout
