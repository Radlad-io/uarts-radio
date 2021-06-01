
import Link from 'next/link'
import Image from 'next/image'
import { baseURL } from '@lib/api'
import ContentParser from '../utils/ContentParser'
import Moment from 'react-moment'

function PostCard( props ) {

  const { slug, image, type, title, description, date } = props;

  console.log(slug)

  return (
    <>
      <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:max-w-none h-full">
        <div className="flex flex-col shadow-lg overflow-hidden">
          <div className="flex-shrink-0">
            <Image
              classNameName='h-48 w-full object-cover'
              src={baseURL + image}
              alt={title}
              width={600}
              height={325}
              priority={true}
              preload={true}
              objectFit='cover'
            />
          </div>
          <div className="flex-1 bg-white p-6 flex flex-col justify-between">
            <div className="flex-1">
              <p className="postType text-sm font-medium">
                <a href="#" className="hover:underline">
                  {type}
                </a>
              </p>
              <Link href={slug}>
                <a className="block mt-2">
                  <p className="text-xl font-semibold text-gray-900">
                    {title}
                  </p>
                  <p className="mt-3 text-base text-gray-500">
                    {description}
                  </p>
                </a>
              </Link>
            </div>
            <div className="mt-6 flex items-center">
              <div className="flex-shrink-0">
                <a href="#">
                  <span className="sr-only">Roel Aufderehar</span>
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
                    <Moment format="MMM Do YYYY">{date}</Moment>
                  </time>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style  jsx>{`
          .postType {
              color: #D22630;
          }
      `}</style>
      </>
  )
}

export default PostCard