// frontend/pages/index.js
import { getShows } from '@lib/api'
import { ShowCard } from '@components/ShowCard'

import Layout from '@components/Layout'
import Footer from '@components/Footer'
import Navbar from '@components/Navbar'

export default function Home({ shows }) {
  return (
    <Layout title='UArts Radio' description=''>
      <Navbar />
      <section className='container mx-auto px-3 xl:px-20'>
        <div className="grid grid-cols-1 sm:grid-cols-2 py-10 gap-1 sm:gap-6 lg:gap-10 items-stretch md:grid-cols-3 lg:grid-cols-4">
          {shows.map((show) => (
            <ShowCard key={show.title} show={show} />
          ))}
        </div>
      </section>
      <Footer />
    </Layout>
  )
}

export async function getServerSideProps() {
  const shows = await getShows()
  return {
    props: {
      shows
    }
  }
}