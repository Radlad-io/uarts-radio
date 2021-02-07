// frontent/pages/movie/[movieId].js
import Moment from "react-moment";

import Layout from '../../components/Layout'
import Link from 'next/link'
import Image from 'next/image'
import { baseUrl, fetchQuery } from '../../utilities/utils'

import ContentParser from "../../components/ContentParser";
import Footer from "../../components/Footer";


export default function Post({ staff }) {


  return (
    <Layout title={'test'}>
      <section className="container mx-auto px-3 xl:px-20">
      <div className='pt-6'>
        <Link href='/'>
          <a className='text-red-500'>&larr; Back to home</a>
        </Link>
      </div>
      
      <section className='flex flex-col md:flex-row md:space-x-6 py-10'>
        <div className='w-full md:w-auto'>
          <Image
            className=''
            src={`${baseUrl}${staff[0].profile_image.url}`}
            width={600}
            height={350}
            preload='true'
            objectFit='cover'
          />
        </div>
      </section>

      <h1 className='text-black'>{staff[0].name}</h1>
      <h6>{staff[0].major.replace("_"," ")}</h6>
      <br />
      </section>
      {staff[0].content.map((content) => (
          <ContentParser content={content} />
        ))}
        
        <Footer />
      
      <style jsx>{`
        h1 {
          font-size: 2rem;
          text-transform: uppercase;
          font-weight: 900;
          letter-spacing: .5rem;
        }

        p {
          font-size: 1.2rem;
          white-space: pre-line;
        }

        h6 {
                font-size: .8rem;
                font-weight:700;
                color: #D22630;
                text-transform: uppercase;
            }
        `}
      </style>
    </Layout>
  )
}


// Queries Strapi for a post with a matching slug
export async function getStaticProps({ params }) {
  const staff = await fetchQuery('users', `?slug=${params.slug}`)
  return {
    props: {
      staff
    }
  }
}

// Grabs all the posts in order to make a route for each of them
export async function getStaticPaths() {
  const staff = await fetchQuery('users')
  const paths = staff.map((staff) => {
    return {
      params: { slug: String(staff.slug) }
    }
  })
  return {
    paths,
    fallback: false
  }
}