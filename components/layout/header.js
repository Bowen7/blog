import Link from 'next/link'
import styled from 'styled-components'
const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 1rem;
`
const Brand = styled.p`
  font-size: 1.5rem;
  cursor: pointer;
  margin-top: 0;
  color: #000;
`
const Logo = styled.img`
  width: 80px;
  height: 80px;
  cursor: pointer;
`
const Nav = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  a {
    font-size: 0.875rem;
    color: #696969;
    margin-left: 1rem;
  }
  img {
    width: 1.25rem;
    height: 1.25rem;
  }
`
export default function Header({ page }) {
  return (
    <>
      <StyledHeader>
        <Link href="/">
          <Logo src="/icons/logo.svg" />
        </Link>
        {page === '' && (
          <Link href="/">
            <Brand>Bowen Codes</Brand>
          </Link>
        )}
      </StyledHeader>
      {page === '' && (
        <Nav>
          <a
            href="https://github.com/Bowen7"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 0 }}
          >
            <img src="/icons/github.png" alt="github"></img>
          </a>
          {/* <Link href="/about">关于</Link> */}
        </Nav>
      )}
    </>
  )
}
