
import Image from 'next/image'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import Card from '@components/modules/Card'

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
      delay: .25,
      staggerChildren: 0.2,
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

function CardList({data}) {
  return (
    <>
      <section className="container mx-auto px-3 xl:px-20 mb-20">
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-6 lg:gap-10 items-stretch md:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {data.map((data) => (
              <motion.div
                variants={item}
              >
              <Card
                slug={`/posts/${data.slug}`}
                key={data.id}
                image={data.cover_image.url}
                type={data.type}
                title={data.title}
                description={data.description}
                date={data.scheduled ? data.scheduled : data.created_at}
              />
            </motion.div>            
          ))}

        </motion.div>
      </section>
      </>
  )
}

export default CardList

