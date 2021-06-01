import useSWR from 'swr'
import Image from 'next/image'
import styled from 'styled-components'
import { baseURL } from '@lib/api'
import { motion } from 'framer-motion'
import PostCard from '@components/modules/Card'



const LoadingStyle = styled.p`
  margin-top: 50px;
  margin-bottom: 500px;
  font-size: 2rem;
  font-weight: 900;
  color: lightgray;
  letter-spacing: 1px;
`

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

function PostList() {

// TODO: This is a temporary fetch method. Figure out how to use Graphql via SWR or React-Query
const endpoint = `${baseURL}/posts?_sort=id:DESC`

// TODO: Replace fetcher with graphql implementation
const fetcher = (...args) => fetch(...args).then(res => res.json())

  const{ data, error } = useSWR(endpoint, fetcher, { refreshInterval: 60000 })

  if (error) {
      return (
        <LoadingStyle>
          {`Failed to load data.
            ${error}
          `}
        </LoadingStyle>
      )
  }

  if (!data) {
      return (
        <LoadingStyle>
          Loading...
        </LoadingStyle>
      ) 
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
            <PostCard
              slug={`/posts/${post.slug}`}
              key={post.id}
              image={post.cover_image.url}
              type={post.type}
              title={post.title}
              description={post.description}
              date={post.scheduled ? post.scheduled : post.created_at}
            />
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

