// TODO: Design a home page

// frontend/pages/index.js
import Layout from '../components/Layout'
import Link from 'next/link'
import { baseUrl, fetchQuery } from '../utilities/utils'

import { PostCard } from '../components/PostCard'
import Footer from '../components/Footer'
import SectionTitle from '../components/SectionTitle'



export default function About({ posts }) {

  return (
    <Layout title='UArts Radio' description=''>
        <SectionTitle title={'About'} />
      <div className="container mx-auto px-3 xl:px-20">

      </div>
      
        <Footer />
      <style jsx>{`
      `}</style>
    </Layout>
  )
}
