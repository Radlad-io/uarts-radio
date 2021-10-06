import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import Moment from "react-moment";
import { baseURL, getStaff, getStaffBySlug  } from '@lib/api'

import Layout from '@components/layouts/Layout'
import ContentParser from "@components/utils/ContentParser";
import Socials from "@components/elements/Socials";
import CardList from '@components/layouts/CardList';
import SectionTitle from '@components/elements/SectionTitle';


function removeDuplicates(originalArray, prop) {
  var newArray = [];
  var lookupObject  = {};

  for(var i in originalArray) {
     lookupObject[originalArray[i][prop]] = originalArray[i];
  }

  for(i in lookupObject) {
      newArray.push(lookupObject[i]);
  }
   return newArray;
}

export default function Staff({ staff, preview }) {

  const router = useRouter()
  
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  const {
    name, 
    created_at, 
    socials, 
    interests, 
    profile_image, 
    content, 
    authored,
    edited,
    photography
  } = staff;

  const contributions = []

  Array.prototype.push.apply(contributions, authored );
  Array.prototype.push.apply(contributions, edited );
  Array.prototype.push.apply(contributions, photography );
  
  const articles = removeDuplicates(contributions, "id");

  return (
    <Layout title={`${name}`}>
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
                <br />
                <p className="text-base font-medium text-gray-500">Interests</p>
                {socials.map((social) => (
                  <Socials social={social}/>
                ))}
                {interests.map((tag) => (
                    <Link href={`/explore?tags=${tag.tag}`}><a className="tag">{tag.tag}</a></Link>
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
                    <span className="sr-only">Watch our video to learn more</span>
                    <Image
                      className='rounded-lg w-full sm:w-64'
                      src={`${baseURL}${profile_image.url}`}
                      alt={name}
                      width={800}
                      height={800}
                      layout='responsive'
                      priority={true}
                      objectFit='cover'
                    />

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

        <SectionTitle  title={`They've contributed to:`}/>
        
        <CardList data={articles}/>

      
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


export async function getStaticProps( context ) {
  const staff = await getStaffBySlug(context.params.slug)

  if (context.preview === true){
    const preview = context.preview
    return {
      props: {
        staff,
        preview
      },
      revalidate: 30
    }
  } else {
    return {
      props: {
        staff
      },
      revalidate: 30
    }
  }
}


export async function getStaticPaths() {
  const staff = await getStaff()

  const paths = staff.map((user) => {
    return { params: { slug: user.slug } }
  })
  
  return {
    paths: paths,
    fallback: true
  }
}