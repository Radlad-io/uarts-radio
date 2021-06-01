// frontend/pages/index.js

import Link from 'next/link'
import { useRouter } from 'next/router'
import { fetchQuery } from '../utilities/utils'

import Layout from '@components/layouts/Layout'
import Tag from '@components/elements/Tag'
import Footer from '@components/modules/Footer'
import Navbar from '@components/modules/Navbar'
import PostList from '@components/layouts/PostList'
import Loarder from '@components/elements/Loader'


export default function Home({ tags }) {

  return (
    
    <Layout title='UArts Radio' description=''>
      <Navbar />
      <section className='container mx-auto px-3 xl:px-20'>

      <div className="flex-1 flex mt-20">
        
      </div>
        {tags.map((tag) => (
            <Tag tag={tag}/>
        ))}
        <Loarder />
        
        <PostList />

      </section>

      <Footer />
      <style jsx>{`
        
        .tag {
          display: inline-block;
          font-size: .8rem;
          margin: 1rem 1rem 0 0;
          background-color: #D22630;
          color: white;
          padding: .4rem .6rem;
          text-transform: uppercase;
          letter-spacing: .1rem;
          font-weight: 700;
        }

        .tag:hover {
          cursor:pointer;
          color: white;
          background-color: #DB5159;
        }

        `}
      </style>
    </Layout>
  )
}

export async function getServerSideProps({query}) {

  const tags = await fetchQuery('tags')

  return {
    props: {
      tags
    },
  }
}

