import Link from 'next/link'
export default function Header({ page }) {
  return (
    <>
      <header className="flex justify-center items-center flex-col mb-4">
        <Link href="/">
          <img className="w-20 h-20 cursor-pointer" src="/icons/logo.svg" />
        </Link>
        {page === '' && (
          <Link href="/" className="no-underline">
            <p className="text-2xl cursor-pointer text-black mt-0">
              Bowen Codes
            </p>
          </Link>
        )}
      </header>
      {page === '' && (
        <div className="flex flex-row justify-end items-center">
          <a
            href="https://github.com/Bowen7"
            target="_blank"
            rel="noopener noreferrer"
            className=""
            style={{ fontSize: 0 }}
          >
            <img src="/icons/github.png" alt="github" className="w-5 h-5"></img>
          </a>
          {/* <Link href="/about">关于</Link> */}
        </div>
      )}
    </>
  )
}
