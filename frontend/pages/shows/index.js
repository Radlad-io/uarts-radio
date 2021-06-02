// frontend/pages/index.js
import { getShows } from '@lib/api'

import Layout from '@components/layouts/Layout'
import PostCard from '@components/modules/Card'

export default function Home({ shows }) {
  return (
    <Layout title='UArts Radio' description=''>
      <section className='container mx-auto px-3 xl:px-20'>
        <div className="grid grid-cols-1 sm:grid-cols-2 py-10 gap-1 sm:gap-6 lg:gap-10 items-stretch md:grid-cols-2 lg:grid-cols-3">
          {shows.map((show) => (
            <PostCard
              slug={`shows/${show.slug}`}
              key={show.id}
              image={show.cover_image.url}
              type={""}
              title={show.title}
              description={show.description}
              date={show.created_at}
          />
          ))}
        </div>
      </section>
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