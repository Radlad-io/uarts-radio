
import { baseUrl, fetchQuery } from '../../utilities/utils'
import Image from 'next/image'
import Link from 'next/link'

function Hero({ content }) {
  return (
    <>
      <section>
        {
          content.cover_video ? 
          <video 
            autoplay="true" 
            src={`${baseUrl}${content.cover_video.url}`} 
            type="video/mp4"
            muted="true"
            loop="true"
          /> 
          :
          <Image
            className='rounded-lg w-full sm:w-64'
            src={`${baseUrl}${content.cover_image.url}`}
            alt={content.title}
            width={600}
            height={350}
            priority={true}
            objectFit='cover'
          />
        }
      </section>


      <style jsx>{`


          `}</style>
    </>
  )
}

export default Hero;