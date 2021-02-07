// frontend/components/Layout.js
import Link from 'next/link'
import Head from 'next/head'

export default function Layout({ children, title, description }) {
  return (
    <>
      <Head>
        <meta name='description' content={description} />
        <title>{title}</title>
      </Head>
      <header>
      <div className="relative pt-6 pb-4 container mx-auto px-3 xl:px-20">
        <nav className=" mx-auto flex items-center justify-between px-4 sm:px-6" aria-label="Global">
          <div className="flex items-center flex-1">
            <div className="flex items-center justify-between w-full md:w-auto">
              <a href="/">
                <span className="sr-only">UArts Radio</span>
                <h1 className="tracking-wider">UArts Radio</h1>
              </a>
              
            </div>
          </div>
          <div className="hidden md:block md:ml-10 md:space-x-10 px-5">
            <a href="/explore" className="font-medium text-gray-500 hover:text-gray-900">Explore</a>
            <a href="/shows" className="font-medium text-gray-500 hover:text-gray-900">shows</a>
            <a href="/staff" className="font-medium text-gray-500 hover:text-gray-900">staff</a>
            <a href="/about" className="font-medium text-gray-500 hover:text-gray-900">about</a>
          </div>
          <div className="hidden md:block text-right">
            <span className="inline-flex rounded-md shadow-md ring-1 ring-black ring-opacity-5">
              <a href="/listen-now" className="inline-flex items-center px-4 py-2 border border-transparent text-base text-white font-medium rounded-md bg-red-700 hover:bg-red-500">
                Listen Now
              </a>
            </span>
          </div>
        </nav>
        </div>
      </header>

      <main className='min-h-screen'>
        <div>{children}</div>
      </main>

      <style jsx>{`
      h1 {
        text-transform: uppercase;
        font-size: 1.5rem;
        font-weight: 900;
      }
      a {
        text-transform: uppercase;
      }
        `}
      </style>
    </>
  )
}