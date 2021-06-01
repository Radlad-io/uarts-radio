// frontend/components/Layout.js
import { useState } from 'react'
import Head from 'next/head'
import Meta from '../utils/meta'
import StreamingModal from '@components/layouts/StreamingModal'

export default function Layout({ preview, children, title, description }) {

  const [ streamingModalState, setStreamingModalState ] = useState(false)

  return (
    <>
      <Head>
        <meta name='description' content={description} />
        <title>UArts Radio | {title}</title>
      </Head>


      <main className='min-h-screen'>
        <div>{children}</div>
      </main>
      
      <StreamingModal />
      
    </>
  )
}