// frontend/pages/index.js

import Link from 'next/link'
import Layout from '../components/Layout'
import { fetchQuery } from '../utilities/utils'
import { useRouter } from 'next/router'
import { PostCard } from '../components/PostCard'

import Tag from '../components/Tag'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { motion } from 'framer-motion'

export default function Home({ posts, tags, query }) {

  const container ={
    hidden: { opacity: 0, y:70 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.5,
        type: 'easeIn'
      }
    }
  }

  const item = {
    hidden: { 
      opacity: 0,
      y:70
    },
    show: {
      opacity: 1,
      y:0,
      transition: {
        type: 'easeIn'
      }
    }
  }

  return (
    
    <Layout title='UArts Radio' description=''>
      <Navbar />
      <section className='container mx-auto px-3 xl:px-20'>
      <div className="flex-1 flex mt-20">
        </div>
        {tags.map((tag) => (
            <Tag tag={tag}/>
        ))}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 py-10 gap-1 sm:gap-6 lg:gap-10 items-stretch md:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {posts.map((post) => (
            <motion.div
              variants={item}
            >
              <PostCard key={post.title} post={post} />
            </motion.div>            
          ))}
        </motion.div>
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

  let search = query ? `?${Object.keys(query)}=${Object.values(query)}` : ""

  const posts = await fetchQuery('posts', search)
  const tags = await fetchQuery('tags')


  return {
    props: {
      posts,
      tags,
      query
    }
  }
}