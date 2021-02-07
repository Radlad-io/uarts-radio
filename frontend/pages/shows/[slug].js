// frontent/pages/movie/[movieId].js
import Moment from "react-moment";

import Layout from '../../components/Layout'
import Link from 'next/link'
import Image from 'next/image'
import { baseUrl, fetchQuery } from '../../utilities/utils'

import ContentParser from "../../components/ContentParser";
import Carousel from "../../components/Carousel";
import Footer from "../../components/Footer";
import Hero from "../../components/Hero";


export default function Post({ shows }) {

  const props = shows[0];

  return (
    <Layout title={props.title}>
      <div className="container mx-auto px-3 xl:px-20">
      <div className='pt-6'>
        <Link href='/'>
          <a className='text-red-500'>&larr; Back to home</a>
        </Link>
      </div>
      
      <section className='flex flex-col md:flex-row md:space-x-6 py-10'>
        <div className='w-full md:w-auto'>
          <Hero content={shows} />
        </div>
        
      </section>

      <h1 className='text-black'>{props.title}</h1>

      <br />
      <hr />
      <p className="tag-list">
        Tags
        </p>
        {props.tags.map((tag) => (
              <Link href="/posts"><p className="tag">{tag.tag}</p></Link>
          ))} 
      </div>

      <br />
      {props.content.map((content) => (
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


// Queries Strapi for a post with a matching slug
export async function getStaticProps({ params }) {
  const shows = await fetchQuery('shows', `?slug=${params.slug}`)
  return {
    props: {
      shows
    }
  }
}

// Grabs all the posts in order to make a route for each of them
export async function getStaticPaths() {
  const shows = await fetchQuery('shows')
  const paths = shows.map((show) => {
    return {
      params: { slug: String(show.slug) }
    }
  })
  return {
    paths,
    fallback: false
  }
}