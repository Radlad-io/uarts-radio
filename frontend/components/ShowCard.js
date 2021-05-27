// frontend/components/MoiesCard.js
import Link from 'next/link'
import Image from 'next/image'
import { baseURL } from '../lib/api'

export function ShowCard({ show }) {
  return (
    <div className="container mx-auto px-3 xl:px-20">
      <Link key={show.title} href={`/shows/${show.slug}`}>
        <a className='flex flex-col overflow-hidden mt-6'>
            <Image
              className='block w-full flex-1'
              src={`${baseURL}${show.cover_image.url}`}
              alt={show.title}
              width={600}
              height={350}
              loading='lazy'
              objectFit='cover'
            />
          <h2 className='text-black mt-3 text-center justify-end text-lg'>
            {show.title}
          </h2>
        </a>
    </Link>
    </div>
  )
}