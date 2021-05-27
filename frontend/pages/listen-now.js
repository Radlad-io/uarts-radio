
// frontend/pages/index.js
import Image from 'next/image'
import Link from 'next/link'
import { baseUrl, fetchQuery } from '../utilities/utils'

import Layout from '@components/Layout'
import { PostCard } from '@components/PostCard'
import Footer from '@components/Footer'
import SectionTitle from '@components/SectionTitle'



export default function Home({ posts }) {

  return (
    <Layout title='UArts Radio' description=''>

      <SectionTitle title={'Listen Now'} />

        <Footer />
      <style jsx>{`

      `}</style>
    </Layout>
  )
}

export async function getServerSideProps() {
  const posts = await fetchQuery('posts', '?featured=true')
  return {
    props: {
      posts
    }
  }
}