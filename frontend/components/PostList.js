import useSWR from 'swr'
import Image from 'next/image'
import { baseURL } from '@lib/api'
import { motion } from 'framer-motion'

import { PostCard } from '@components/PostCard'

const endpoint = `${baseURL}/posts`

const fetcher = (...args) => fetch(...args).then(res => res.json())

function PostList() {

  const container ={
    hidden: { opacity: 0, y:70 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.15,
        type: 'ease'
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
        duration: .65,
        type: 'ease'
      }
    }
  }

  const{ data, error } = useSWR(endpoint, fetcher)
  if (error) {
      return <p>Failed to load Data</p>
  }
  if (!data) {
      return <p>Loading....</p>
  }
  return (
    <>
    <div className="list">
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 py-10 gap-1 sm:gap-6 lg:gap-10 items-stretch md:grid-cols-2 lg:grid-cols-3"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {data.map((post) => (
          <motion.div
            variants={item}
          >
            <PostCard key={post.title} post={post} />
          </motion.div>            
        ))}
      </motion.div>
    </div>
      
      <style jsx>{`
      .grid {
        list: minmax(500px, auto);
      }
        `}
      </style>
      </>
  )
}

export default PostList

