
// frontend/pages/index.js
import Image from 'next/image'
import Link from 'next/link'
import { baseUrl, fetchQuery } from '../utilities/utils'

import Layout from '@components/layouts/Layout'
import { PostCard } from '@components/modules/Card'
import Footer from '@components/modules/Footer'
import SectionTitle from '@components/elements/SectionTitle'



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