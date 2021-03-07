// frontent/pages/movie/[movieId].js
import Moment from "react-moment";

import Layout from '../../components/Layout'
import Link from 'next/link'
import Image from 'next/image'
import { getStaffBySlug  } from '../../lib/api'
import { baseUrl, fetchQuery } from '../../utilities/utils'

import Navbar from "../../components/Navbar";
import ContentParser from "../../components/ContentParser";
import Footer from "../../components/Footer";
import Socials from "../../components/Socials";


export default function Post({ staff }) {

  const {name, created_at, socials, interests, profile_image, content } = staff;

  return (
    <Layout title={`Staff | ${name}`}>
      <Navbar />
      <section className="container mx-auto px-3 xl:px-20">
      <div className="relative bg-white overflow-hidden">
        <div className="hidden lg:block lg:absolute lg:inset-0" aria-hidden="true">
          <svg className="absolute top-0 left-1/2 transform translate-x-64 -translate-y-8" width="640" height="784" fill="none" viewBox="0 0 640 784">
            <defs>
              <pattern id="9ebea6f4-a1f5-4d96-8c4e-4c2abf658047" x="118" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="4" height="4" className="text-gray-200" fill="currentColor" />
              </pattern>
            </defs>
            <rect y="72" width="640" height="640" className="text-gray-50" fill="currentColor" />
            <rect x="118" width="404" height="784" fill="url(#9ebea6f4-a1f5-4d96-8c4e-4c2abf658047)" />
          </svg>
        </div>
        <div className="relative pt-6 pb-16 sm:pb-24 lg:pb-32">
          <main className="mt-16 mx-auto px-4 sm:mt-24 sm:px-6 lg:mt-32">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
                <h1>
                  <span className="block text-sm font-semibold uppercase tracking-wide text-gray-500 sm:text-base lg:text-sm xl:text-base">
                    <Moment format="MMM Do YYYY">{created_at}</Moment>
                  </span>
                  <span className="mt-1 block text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl">
                    <span className="block text-gray-900 tracking-wide">{name}</span>
                  </span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                  Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua ad ad non deserunt sunt.
                </p>
                <br />
                {socials.map((social) => (
                  <Socials social={social}/>
                ))}
                {interests.map((tag) => (
                    <Link href={`/explore?tags.tag=${tag.tag}`}><a className="tag">{tag.tag}</a></Link>
                ))}
              
              </div>
              <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
                <svg className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 scale-75 origin-top sm:scale-100 lg:hidden" width="640" height="784" fill="none" viewBox="0 0 640 784" aria-hidden="true">
                  <defs>
                    <pattern id="4f4f415c-a0e9-44c2-9601-6ded5a34a13e" x="118" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                      <rect x="0" y="0" width="4" height="4" className="text-gray-200" fill="currentColor" />
                    </pattern>
                  </defs>
                  <rect y="72" width="640" height="640" className="text-gray-50" fill="currentColor" />
                  <rect x="118" width="404" height="784" fill="url(#4f4f415c-a0e9-44c2-9601-6ded5a34a13e)" />
                </svg>
                <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                  <button type="button" className="relative block w-full bg-white rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span className="sr-only">Watch our video to learn more</span>
                    <Image
                      className='rounded-lg w-full sm:w-64'
                      src={`${baseUrl}${profile_image.url}`}
                      alt={name}
                      width={800}
                      height={800}
                      preload='true'
                      objectFit='cover'
                    />
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      </section>
              
      <br />
      <br />

      {content.map((content) => (
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

        .major {
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
          margin: .5rem 1rem .5rem 0;
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


// Queries Strapi for a post with a matching slug
// export async function getStaticProps({ params }) {
//   const staff = await fetchQuery('users', `?slug=${params.slug}`)
//   return {
//     props: {
//       staff
//     }
//   }
// }

export async function getStaticProps( context ) {
  const staff = await getStaffBySlug(context.params.slug)
  if (context.preview === true){
    const preview = context.preview
    return {
      props: {
        staff,
        preview
      }
    }
  } else {
    return {
      props: {
        staff
      }
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