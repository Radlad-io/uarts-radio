
// frontend/pages/index.js
import Layout from '../components/Layout'
import Image from 'next/image'
import Link from 'next/link'
import { baseURL, getPosts, getFeaturedStaff, getShows  } from '../lib/api'

import { PostCard } from '../components/PostCard'
import Footer from '../components/Footer'
import SectionTitle from '../components/SectionTitle'
import Navbar from '../components/Navbar'
import Moment from 'react-moment'
import Tag from '../components/Tag'
import { motion, useViewportScroll, useTransform } from "framer-motion"



export default function Home({ posts, featuredAuthor, featuredShows }) {

  const featuredPosts = posts.slice(1)

  const container ={
    hidden: { opacity: 0, y:70 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.2,
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

  const { scrollYProgress } = useViewportScroll();
  const scale = useTransform(scrollYProgress, [0, 1.2], [0.9, 1.2]);

  return (
    <Layout title='UArts Radio' description=''>
      <Navbar />
      <div className="bg-white">
        <main>
          {/*  Hero section  */}
          <div className="pt-8 overflow-hidden sm:pt-12 lg:relative lg:py-20">
            <motion.div 
              className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl lg:grid lg:grid-cols-2 lg:gap-24"
              variants={container}
              initial="hidden"
              animate="show"
            >
              <div>
                <div className="mt-20">
                  <motion.div
                    variants={item}
                  >
                    <a href="#" className="inline-flex space-x-4">
                      <span className="rounded bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-500 tracking-wide uppercase">
                      <Moment format="MMM Do ">{posts[0].published_at}</Moment>
                      </span>
                    </a>
                  </motion.div>
                  <div className="mt-6 sm:max-w-xl">
                    <motion.h1 
                      className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl"
                      variants={item}
                    >
                      {posts[0].title}
                    </motion.h1>
                    <motion.p
                      className="mt-6 text-xl text-gray-500"
                      variants={item}
                    >
                      {posts[0].description}
                    </motion.p>
                    <motion.p 
                      className="mt-6"
                      variants={item}
                    >
                      <b>Author: </b><span className="text-xl text-gray-500">{posts[0].authors[0].name}</span>
                    </motion.p>
                    <motion.div
                      variants={item}
                    >
                      {posts[0].tags.map((tag) => (
                        <Tag tag={tag}/>
                        ))}
                    </motion.div>
                  </div>
                  <div className="mt-6">
                    <div className="inline-flex items-center divide-x divide-gray-300">
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="sm:mx-auto sm:max-w-3xl sm:px-6">
              <div className="py-12 sm:relative sm:mt-12 sm:py-16 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                <div className="hidden sm:block">
                  <div className="absolute inset-y-0 left-1/2 w-screen bg-gray-50 rounded-l-3xl lg:left-80 lg:right-0 lg:w-full"></div>
                  <svg className="absolute top-8 right-1/2 -mr-3 lg:m-0 lg:left-0" width="404" height="392" fill="none" viewBox="0 0 404 392">
                    <defs>
                      <pattern id="837c3e70-6c3a-44e6-8854-cc48c737b659" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <rect x="0" y="0" width="4" height="4" className="text-gray-200" fill="currentColor" />
                      </pattern>
                    </defs>
                    <rect width="404" height="392" fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)" />
                  </svg>
                </div>
                <motion.div 
                  className="relative pl-4 -mr-40 sm:mx-auto sm:max-w-3xl sm:px-0 lg:max-w-none lg:h-full lg:pl-12"
                  initial={{ opacity: 0, x: 750 }}
                  animate={{ opacity: 1 , x: 0}}
                  transition={{ type: 'easeIn', duration: 1 }}
                >
                  <Image 
                    className="w-full shadow-xl ring-1 ring-black ring-opacity-5 lg:h-full lg:w-auto lg:max-w-none" 
                    src={`${baseURL}${posts[0].cover_image.url}`}
                    width={750}
                    height={550}
                    objectFit='cover'
                    priority={true}
                    alt="" 
                    />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Testimonial/stats section  */}
          <div className="relative mt-20">
            <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-24 lg:items-start">
              <div className="relative sm:py-16 lg:py-0">
                <div aria-hidden="true" className="hidden sm:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-screen">
                  <div className="absolute inset-y-0 right-1/2 w-full bg-gray-50 rounded-r-3xl lg:right-72"></div>
                  <svg className="absolute top-8 left-1/2 -ml-3 lg:-right-8 lg:left-auto lg:top-12" width="404" height="392" fill="none" viewBox="0 0 404 392">
                    <defs>
                      <pattern id="02f20b47-fd69-4224-a62a-4c9de5c763f7" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <rect x="0" y="0" width="4" height="4" className="text-gray-200" fill="currentColor" />
                      </pattern>
                    </defs>
                    <rect width="404" height="392" fill="url(#02f20b47-fd69-4224-a62a-4c9de5c763f7)" />
                  </svg>
                </div>
                <motion.div
                  className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0 lg:max-w-none lg:py-20"
                  className="container"
                  style={{
                    scale
                  }}
                >
                  {/* Testimonial card  */}
                    <Image
                      className="absolute inset-0 h-full w-full object-cover" 
                      src={`${baseURL}${featuredAuthor.profile_image.url}`}
                      width={400}
                      height={650}
                      objectFit='cover'
                      alt="" 
                    />
                </motion.div>
              </div>

              <div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0">
                {/* Content area  */}
                <div className="pt-12 sm:pt-16 lg:pt-20">
                  <h2 className="text-3xl text-gray-900 font-extrabold tracking-wide sm:text-4xl">
                    Featured Staff                  
                  </h2>
                  <h3 className="text-2xl text-gray-900 tracking-wide sm:text-4xl">
                    {featuredAuthor.name}
                  </h3>
                  <div className="mt-6 text-gray-500 space-y-6">
                    <p className="text-lg">
                      {featuredAuthor.short_biography}
                    </p>
                  </div>
                </div>

                {/* Stats section  */}
                <div className="mt-10">
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-8">
                    <div className="border-t-2 mr-4 border-gray-100 pt-6">
                      <dt className="text-base font-medium text-gray-500">Joined</dt>
                      <dd className="text-3xl font-extrabold tracking-tight text-gray-900">
                      <Moment format="MMM Do YYYY ">{featuredAuthor.created_at}</Moment>
                      </dd>
                    </div>

                    <div className="border-t-2 mr-4 border-gray-100 pt-6">
                      <dt className="text-base font-medium text-gray-500">Written</dt>
                      <dd className="text-3xl font-extrabold tracking-tight text-gray-900">
                        {/* TODO: Figure out how to add counts in the GraphQL query */}
                        {/* {featuredAuthor.authored.length} Articles */}
                      </dd>
                    </div>

                    <div className="border-t-2 mr-4 border-gray-100 pt-6">
                      <dt className="text-base font-medium text-gray-500">Edited</dt>
                      <dd className="text-3xl font-extrabold tracking-tight text-gray-900">
                        {/* {featuredAuthor.edited.length} Articles */}
                      </dd>
                    </div>

                    <div className="border-t-2 mr-4 border-gray-100 pt-6">
                      <dt className="text-base font-medium text-gray-500">Photography for</dt>
                      <dd className="text-3xl font-extrabold tracking-tight text-gray-900">
                        {/* {featuredAuthor.photography.length} Articles */}
                      </dd>
                    </div>

                  </dl>
                  <br />
                  
                  <div className="border-t-2 mr-4 border-gray-100 pt-6">
                      <dt className="text-base font-medium text-gray-500">Interests</dt>
                      <dd className="">
                        {featuredAuthor.interests.map((tag) => (
                            <Tag tag={tag}/>
                          ))}
                      </dd>
                    </div>

                  <div className="mt-10">
                    <a href="#" className="text-base font-medium text-rose-500">
                      Learn more about {featuredAuthor.name} &rarr;
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* Logo cloud section  */}
          <div className="mt-32">
            <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
              <div className="lg:grid lg:grid-cols-2 lg:gap-24 lg:items-center">
                <div>
                  <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                    All of our shows are created by members of the UArts Community
                  </h2>
                  <p className="mt-6 max-w-3xl text-lg leading-7 text-gray-500">
                    Sagittis scelerisque nulla cursus in enim consectetur quam. Dictum urna sed consectetur neque tristique pellentesque. Blandit amet, sed aenean erat arcu morbi. Cursus faucibus nunc nisl netus morbi vel porttitor vitae ut. Amet vitae fames senectus vitae.
                  </p>
                  <div className="mt-6">
                    <a href="#" className="text-base font-medium text-rose-500">
                      Checkout all of our shows &rarr;
                    </a>
                  </div>
                </div>
                <motion.div 
                  className="mt-12 grid grid-cols-2 gap-0.5 md:grid-cols-3 lg:mt-0 lg:grid-cols-2"
                >
                  <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
                    <h4 className="text-lg text-center uppercase text-gray-300 font-bold self-center">{featuredShows[0].title}</h4>
                  </div>
                  <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
                    <h4 className="text-lg text-center uppercase text-gray-300 font-bold self-center">{featuredShows[1].title}</h4>
                  </div>
                  <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
                    <h4 className="text-lg text-center uppercase text-gray-300 font-bold self-center">{featuredShows[2].title}</h4>
                  </div>
                  <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
                    <h4 className="text-lg text-center uppercase text-gray-300 font-bold self-center">{featuredShows[3].title}</h4>
                  </div>
                  <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
                    <h4 className="text-lg text-center uppercase text-gray-300 font-bold self-center">{featuredShows[4].title}</h4>
                  </div>
                  <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
                    <h4 className="text-lg text-center uppercase text-gray-300 font-bold self-center">{featuredShows[5].title}</h4>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/*  CTA section  */}
          <div className="relative mt-24 sm:mt-32 sm:py-16">
            <div aria-hidden="true" className="hidden sm:block">
              <div className="absolute inset-y-0 left-0 w-1/2 bg-gray-50 rounded-r-3xl"></div>
              <svg className="absolute top-8 left-1/2 -ml-3" width="404" height="392" fill="none" viewBox="0 0 404 392">
                <defs>
                  <pattern id="8228f071-bcee-4ec8-905a-2a059a2cc4fb" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <rect x="0" y="0" width="4" height="4" className="text-gray-200" fill="currentColor" />
                  </pattern>
                </defs>
                <rect width="404" height="392" fill="url(#8228f071-bcee-4ec8-905a-2a059a2cc4fb)" />
              </svg>
            </div>
            <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
              <div className="relative rounded-2xl px-6 py-10 bg-rose-500 overflow-hidden shadow-xl sm:px-12 sm:py-20">
                <div aria-hidden="true" className="absolute inset-0 -mt-72 sm:-mt-32 md:mt-0">
                  <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 1463 360">
                    <path className="text-rose-400 text-opacity-40" fill="currentColor" d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z" />
                    <path className="text-rose-600 text-opacity-40" fill="currentColor" d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z" />
                  </svg>
                </div>
                <div className="relative">
                  <div className="sm:text-center">
                    <h2 className="text-3xl font-extrabold text-black tracking-tight sm:text-4xl">
                      Join out mailing list
                    </h2>
                    <p className="mt-6 mx-auto max-w-2xl text-lg text-rose-100">
                      All the goods, straight to your inbox, every week-ish.
                    </p>
                  </div>
                  <form action="#" className="mt-12 sm:mx-auto sm:max-w-lg sm:flex">
                    <div className="min-w-0 flex-1">
                      <label for="cta_email" className="sr-only">Email address</label>
                      <input id="cta_email" type="email" className="block w-full border border-transparent rounded-md px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-rose-500" placeholder="Enter your email" />
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-3">
                      <button type="submit" className="block w-full rounded-md border border-transparent px-5 py-3 bg-gray-200 text-base font-medium text-black shadow hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-rose-500 sm:px-10">Submit</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main> 
        </div>
        
        <section className="container mx-auto px-3 xl:px-20 mt-20">
            <SectionTitle title="Some Featured Posts" />
              <div className="grid grid-cols-1 sm:grid-cols-2 py-10 gap-1 sm:gap-6 lg:gap-10 items-stretch md:grid-cols-2 lg:grid-cols-3">
              {featuredPosts.map((post) => (
                <PostCard key={post.title} post={post} />
              ))}
            </div>
          </section>
          
        <Footer />
        <style jsx>{`

        `}</style>
    </Layout>
  )
}

export async function getServerSideProps() {
  const posts = await getPosts(3)
  const featuredAuthor = await getFeaturedStaff()
  const featuredShows = await getShows(6)

  return {
    props: {
      posts,
      featuredAuthor,
      featuredShows
    }
  }
}