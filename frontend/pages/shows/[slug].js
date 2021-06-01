import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import Moment from "react-moment";
import { getShows, getShowBySlug  } from '@lib/api'

import Layout from '@components/layouts/Layout'
import ContentParser from "@components/utils/ContentParser";
import Footer from "@components/modules/Footer";
import Hero from "@components/modules/Hero";
import Navbar from "@components/modules/Navbar";


export default function Show({ show }) {

  const router = useRouter()
  
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  const { title, tags, content } = show;

  return (
    <Layout title={title}>
      <Navbar />
      <div className="container mx-auto px-3 xl:px-20">
      
      <section className='flex flex-col md:flex-row md:space-x-6 py-10'>
        <div className='w-full md:w-auto'>
          <Hero content={show} />
        </div>
        
      </section>

      <h1 className='text-black'>{title}</h1>

      <br />
      <hr />
      <p className="tag-list">
        Tags
        </p>
        {tags.map((tag) => (
              <Link href="/posts"><p className="tag">{tag.tag}</p></Link>
          ))} 
      </div>

      <br />
      {content.map((content) => (
          <ContentParser content={content} />
        ))}
      <br />
      <div className="container mx-auto px-3 xl:px-20">


      </div>

      <br />

      <Footer />
      
      <style jsx>{`
        h1 {
          font-size: 2rem;
          margin-bottom: 1rem;
          text-transform: uppercase;
          font-weight: 900;
          letter-spacing: .5rem;
        }

        p {
          font-size: 1.2rem;
          white-space: pre-line;
        }

        .author {
          display: inline-block;
        }

        a:hover {
          color: #D22630;
        }

        .tag-list {
          text-transform: uppercase;
          font-size: .8rem;
          font-weight: 700;
          display: inline-block;
          padding-right: 1.5rem;
        }

        .tag {
          display: inline-block;
          font-size: .8rem;
          margin: 1rem 1rem 1.5rem 0;
          background-color: #D22630;
          color: white;
          padding: .4rem .6rem;
          text-transform: uppercase;
          letter-spacing: .1rem;
          font-weight: 700;
        }

        .tag:hover {
          cursor:pointer;
          background-color: #DB5159;
        }

        `}
      </style>
    </Layout>
  )
}



export async function getStaticProps( context ) {
  // TODO: Add support for preview state
  const show = await getShowBySlug(context.params.slug)

  if (context.preview === true){
    const preview = context.preview
    return {
      props: {
        post,
        preview
      },
      revalidate: 30
    }
  } else {
    return {
      props: {
        show
      },
      revalidate: 30
    }
  }
}

// Grabs all the posts in order to make a route for each of them
export async function getStaticPaths() {
  const shows = await getShows()

  const paths = shows.map((show) => {
    return { params: { slug: show.slug } }
  })
  
  return {
    paths: paths,
    fallback: true
  }
}