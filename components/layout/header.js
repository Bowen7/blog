import Link from 'next/link'
export default function Header({ page }) {
  return (
    <>
      <header>
        <Link href="/">
          <img className="logo" src="/icons/logo.svg" />
        </Link>
        {page === '' && (
          <Link href="/">
            <p className="brand">Bowen Codes</p>
          </Link>
        )}
      </header>
      {page === '' && (
        <div className="nav">
          <a
            href="https://github.com/Bowen7"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 0 }}
          >
            <img src="/icons/github.png" alt="github"></img>
          </a>
          {/* <Link href="/about">关于</Link> */}
        </div>
      )}
      <style jsx>{`
        header {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          margin-bottom: 1rem;
        }
        .brand {
          font-size: 1.5rem;
          cursor: pointer;
          margin-top: 0;
          color: #000;
        }
        .logo {
          width: 80px;
          height: 80px;
          cursor: pointer;
        }
        .nav {
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          align-items: center;
        }
        .nav > a {
          font-size: 0.875rem;
          color: #696969;
          margin-left: 1rem;
        }
        .nav img {
          width: 1.25rem;
          height: 1.25rem;
        }
      `}</style>
    </>
  )
}
