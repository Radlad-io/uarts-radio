// TODO: Design a home page

// frontend/pages/index.js
import Layout from '../components/Layout'
import Image from 'next/image'
import Link from 'next/link'
import { baseUrl, fetchQuery } from '../utilities/utils'

import { PostCard } from '../components/PostCard'
import Footer from '../components/Footer'
import SectionTitle from '../components/SectionTitle'



export default function Home({ posts }) {

  return (
    <Layout title='UArts Radio' description=''>
      <div className="container mx-auto px-3 xl:px-20">

        <Image
          className='profile-image block w-full flex-1'
          src={`${baseUrl}${posts[0].cover_image.url}`}
          width={1280}
          height={550}
          loading='lazy'
          objectFit='cover'
        />
      <Link href={'/posts/' + posts[0].slug}>  
        <a>{posts[0].title}</a>
      </Link>
      <h3>{posts[0].description}</h3>
      <p className="tag-list">
        Tags
        </p>
        {posts[0].tags.map((tag) => (
              <Link href="/posts"><p className="tag">{tag.tag}</p></Link>
          ))} 
      </div>
      <SectionTitle title={'Featured'} />
        <section className='container mx-auto px-3 xl:px-20'>
          <div className="grid grid-cols-1 sm:grid-cols-2 py-10 gap-1 sm:gap-6 lg:gap-10 items-stretch md:grid-cols-3 lg:grid-cols-3">
            <PostCard key={posts[1].title} post={posts[1]} />
            <PostCard key={posts[2].title} post={posts[2]} />
            <PostCard key={posts[3].title} post={posts[3]} />
          </div>
        </section>
        <Footer />
      <style jsx>{`

        a {
          text-transform: uppercase;
          font-size: 2rem;
          font-weight: 200;
          letter-spacing: .2rem;
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

      `}</style>
    </Layout>
  )
}

export async function getServerSideProps() {
  const posts = await fetchQuery('posts', '?featured=true')
  return {
    props: {
      posts
    }
  }
}