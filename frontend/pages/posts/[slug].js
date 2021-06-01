// frontent/pages/movie/[slug].js
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import Moment from "react-moment";
import { baseURL, previewPostBySlug, getPostBySlug, getPosts  } from '@lib/api'

import Layout from '@components/layouts/Layout'
import ContentParser from "@components/utils/ContentParser";
import Footer from "@components/modules/Footer";
import PreviewBanner from "@components/elements/Banner";
import StaffList from "@components/elements/StaffList";
import Navbar from "@components/modules/Navbar";


export default function Post({ post, preview }) {

  const router = useRouter()
  
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  //TODO: Destructure incoming post data
  const props = post;

  return (
    <Layout title={props.title}>
      { preview === true && props.published_at === null ? <PreviewBanner /> : ""}
      <Navbar />
      <div className="container mx-auto px-3 xl:px-20">
      <div className="relative bg-white overflow-hidden">
        <div className="hidden lg:block lg:absolute lg:inset-0" aria-hidden="true">
          <svg className="absolute top-10 left-1/2 transform translate-x-64 -translate-y-8" width="640" height="784" fill="none" viewBox="0 0 640 784">
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
                  <span className="block text-sm font-semibold uppercase tracking-wide text-gray-500 sm:text-base lg:text-sm xl:text-base">{props.published_at === null ? "This Post has not been published yet" : <Moment format="MMM Do YYYY">{props.published_at}</Moment>}</span>
                  <span className="mt-1 block text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl">
                    <span className="block text-gray-900 tracking-wide">{props.title}</span>
                  </span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                  {props.description}
                </p>
                <br />
                <p>
                  <b>
                  {props.authors.length < 1 ? null : props.authors.length === 1 ? "Author: " : "Authors: "}
                  </b>
                  {props.authors.length > 0 ? <StaffList staff={props.authors} /> : ""} </p>
                <p>
                  <b>
                    {props.editors.length < 1 ? null : props.editors.length === 1 ? "Editor: " : "Editors: "}
                  </b>
                    {props.editors.length > 0 ? <StaffList staff={props.editors} /> : ""}
                </p>
                <p>
                  <b>
                    {props.photographers.length < 1 ? null : props.photographers.length === 1 ? "Photographer: " : "Photographers: "}
                  </b>
                    {props.photographers.length > 0 ? <StaffList staff={props.photographers} /> : ""}
                </p>
                <br />
                {props.tags.map((tag) => (
                    <Link href={`/explore?tags.slug=${tag.slug}`}><a className="tag">{tag.tag}</a></Link>
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
                <div className="relative mx-auto w-full rounded-lg lg:max-w-md">
                    <span className="sr-only">Watch our video to learn more</span>
                    {props.cover_image ? 
                        <Image
                        className='rounded-lg w-full sm:w-64'
                        src={`${baseURL}${props.cover_image.url}`}
                        alt={props.title}
                        width={800}
                        height={500}
                        preload='true'
                        objectFit='cover'
                      />
                    : ""
                    }


                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      
      
      <br />
      <hr />

      </div>

      <br />
      {props.content.map((content) => (
          <ContentParser content={content} />
        ))}
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


// Queries Strapi for a post with a matching slug
export async function getStaticProps( context ) {
  const post = context.preview === true ? await previewPostBySlug(context.params.slug) : await getPostBySlug(context.params.slug)
  if (context.preview === true){
    const preview = context.preview
    return {
      props: {
        post,
        preview
      },
      revalidate: 10
    }
  } else {
    return {
      props: {
        post
      },
      revalidate: 10
    }
  }
}

//TODO: You need to mirro this getStaticPaths method to Shows and Staff
// Grabs all the posts in order to make a route for each of them
export async function getStaticPaths() {
  const posts = await getPosts()

  const paths = posts.map((post) => {
    return { params: { slug: post.slug } }
  })

  return {
    paths: paths,
    fallback: true
  }
}