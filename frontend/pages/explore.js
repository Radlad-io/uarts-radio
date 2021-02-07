// frontend/pages/index.js

import Layout from '../components/Layout'
import { fetchQuery } from '../utilities/utils'
import { useRouter } from 'next/router'
import { PostCard } from '../components/PostCard'

import Footer from '../components/Footer'

export default function Home({ posts, query }) {

console.log(posts.query)

  return (
    
    <Layout title='UArts Radio' description=''>
      <section className='container mx-auto px-3 xl:px-20'>
      <div className="flex-1 flex my-8 mx-6">
          <form className="w-full flex lg:ml-0" action="#" method="GET">
            <label for="search_field" class="sr-only">Search</label>
            <div className="relative w-full text-gray-400 focus-within:text-gray-600">
              <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                </svg>
              </div>
              <input id="search_field" className="block w-full h-full pl-8 pr-3 py-4 border-transparent border-b-2 border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm" placeholder="Search" type="search" name="search" />
            </div>
          </form>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 py-10 gap-1 sm:gap-6 lg:gap-10 items-stretch md:grid-cols-3 lg:grid-cols-4">
          {posts.map((post) => (
            <PostCard key={post.title} post={post} />
          ))}
        </div>
      </section>
      <Footer />
    </Layout>

  )
}

export async function getServerSideProps({query}) {

  let search = query ? `?${Object.keys(query)}=${Object.values(query)}` : ""

  const posts = await fetchQuery('posts', search)
  return {
    props: {
      posts,
      query
    }
  }
}