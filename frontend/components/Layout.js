// frontend/components/Layout.js
import Head from 'next/head'
import Meta from './meta'

export default function Layout({ preview, children, title, description }) {

  return (
    <>
      <Head>
        <meta name='description' content={description} />
        <title>{title}</title>
      </Head>


      <main className='min-h-screen'>
        <div>{children}</div>
      </main>
      
      
    </>
  )
}