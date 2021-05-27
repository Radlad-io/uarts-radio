

import useSWR from 'swr'
import Image from 'next/image'
const youtubeAPIKey = 'AIzaSyCqONJTbKMwPAI9xN9UPX039eIRQA2nhx8'
const endpoint = `https://www.googleapis.com/youtube/v3/videos?key=${youtubeAPIKey}&part=snippet&chart=mostPopular&maxResults=12`

const fetcher = (...args) => fetch(...args).then(res => res.json())

function YouTubePopular() {
    const{ data, error } = useSWR(endpoint, fetcher)
    if (error) {
        return <p>Failed to load Data</p>
    }
    if (!data) {
        return <p>Loading....</p>
    }
    return (
      <section className="container mx-auto px-3 xl:px-20">
        <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
            {data.items.map((video) => (
              <li key={video.id} className="relative">
                <div className="group block w-full aspect-w-16 aspect-h-9 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                  <Image
                    className="object-cover pointer-events-none group-hover:opacity-75"
                    src={video.snippet.thumbnails.high.url}
                    height={260}
                    width={500}
                    objectFit='cover'
                  />
                  <button type="button" className="absolute inset-0 focus:outline-none">
                    <span className="sr-only">{video.id}</span>
                  </button>
                </div>
                {/* <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">{file.title}</p>
                <p className="block text-sm font-medium text-gray-500 pointer-events-none">{file.size}</p> */}
              </li>
            ))}
          </ul>
        </section>
    )
}

export default YouTubePopular
