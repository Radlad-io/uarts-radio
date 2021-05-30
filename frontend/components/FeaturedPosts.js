
import { baseUrl } from '../utilities/utils'
import PostCard from '@components/PostCard'

function FeaturedPosts({ content }) {

    return (
        <>
            <section className="container mx-auto px-3 xl:px-20">
            <h2>{content.title}</h2>
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3">
                {content.posts.map((post) => (
                    <PostCard post={post} />
                ))}
            </div>

            </section> 
            <style  jsx>{`
            section {
                margin: 3rem auto;
            }

            h2 {
                  font-size: 1.5rem;
                  font-weight: 900;
                  text-transform: uppercase;
                  letter-spacing: .35rem;
                  text-align: center;
                  margin: 1rem auto 0px auto ;
              }

            `}</style>
          
        </>
    )
  }
  
  export default FeaturedPosts;