import Link from 'next/link'
import clsx from 'clsx'
import { useRouter } from 'next/router'

const Header = ({ page }) => {
  const isHomeOrAbout = page === '' || page === 'about'
  return (
    <>
      <header className="flex justify-center items-center flex-col mb-4">
        <Link href="/">
          <img className="w-20 h-20 cursor-pointer" src="/icons/logo.svg" />
        </Link>
        {isHomeOrAbout && (
          <Link href="/" className="no-underline">
            <p className="text-2xl cursor-pointer text-black mt-0">
              Bowen Codes
            </p>
          </Link>
        )}
      </header>
      {isHomeOrAbout && (
        <div className="flex flex-row justify-end items-center">
          <Link
            href="/"
            className={clsx(
              page === '' && 'no-underline',
              'mr-4 text-sm text-black'
            )}
          >
            Posts
          </Link>
          <Link
            href="/about"
            className={clsx(
              page === 'about' && 'no-underline',
              'mr-4 text-sm text-black'
            )}
          >
            About
          </Link>
          <a
            href="https://github.com/Bowen7"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 0 }}
          >
            <img src="/icons/github.png" alt="github" className="w-5 h-5"></img>
          </a>
        </div>
      )}
    </>
  )
}

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
