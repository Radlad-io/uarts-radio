// frontend/components/MoiesCard.js
import Link from 'next/link'
import Image from 'next/image'
import { baseUrl } from '../utilities/utils'
import ContentParser from './ContentParser'
import Moment from 'react-moment'

export function PostCard({ post }) {
  // console.log(post)
  return (
      <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:max-w-none">
        <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
          <div className="flex-shrink-0">
            <Image
              classNameName='h-48 w-full object-cover'
              src={baseUrl + post.cover_image.url}
              alt={post.title}
              width={350}
              height={225}
              loading='lazy'
              objectFit='cover'
            />
          </div>
          <div className="flex-1 bg-white p-6 flex flex-col justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-indigo-600">
                <a href="#" className="hover:underline">
                  Article
                </a>
              </p>
              <a href={`/posts/${post.slug}`} className="block mt-2">
                <p className="text-xl font-semibold text-gray-900">
                  {post.title}
                </p>
                <p className="mt-3 text-base text-gray-500">
                  {post.description}
                </p>
              </a>
            </div>
            <div className="mt-6 flex items-center">
              <div className="flex-shrink-0">
                <a href="#">
                  <span className="sr-only">Roel Aufderehar</span>

                  {/* TODO: WTF is up with this components image URL */}
                  {/* <Image
                    classNameName='h-48 w-full object-cover'
                    src={baseUrl + post.authors[0].profile_image.url}
                    // alt={post.title}
                    width={50}
                    height={50}
                    loading='lazy'
                    objectFit='cover'
                  /> */}
                </a>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  <a href="#" className="hover:underline">
                    {/* {post.authors.first_name + " " + post.authors.last_name} */}
                  </a>
                </p>
                <div className="flex space-x-1 text-sm text-gray-500">
                  <time datetime="2020-03-16">
                    <Moment format="MMM Do YYYY">{post.published_at}</Moment>
                  </time>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

  )
}