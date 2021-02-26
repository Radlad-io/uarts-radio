import Link from 'next/link'
import Image from 'next/image'
import { baseUrl } from '../utilities/utils'

function FeaturedStaff({ staff }) {
    return (
        <section className="container mx-auto px-3 xl:px-20">
            {/* TODO: Add a section title to the content type */}
            <h2>Featured Staff</h2>
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3">
                {staff.users.map((staff) => (
                    <div className="aspect-w-1 aspect-h-1">
                        <Link key={staff.name} href={`/staff/${staff.slug}`}>
                            <a className='flex flex-col overflow-hidden mt-6'>
                                <Image
                                    className='Image block w-full flex-1'
                                    src={`${baseUrl}${staff.profile_image.url}`}
                                    width={650}
                                    height={650}
                                    objectFit='cover'
                                    object-position='top'
                                />
                                <h4 className='text-black mt-3'>
                                    {staff.name}
                                </h4>
                                <h6>{staff.major.replace("_"," ")}</h6>
                                {/* TODO: Append and ellipsis if content length exceeds slice length */}
                                <p>{staff.short_biography.length >= 300 ? staff.short_biography.slice(0,300) + "..." : staff.short_biography}</p>
                            </a>
                        </Link>
                    </div>
                ))}
            </div>
            <Link key={staff.name} href='/staff'>
                <span className="link">SEE OUR FULL LIST OF STAFF</span>
            </Link>
            <hr />

            <div className="clearFloat"></div>
            
            

            <style jsx>{`
                section {
                    margin-top: 3rem;
                }
                
              h2 {
                  font-size: 1.5rem;
                  font-weight: 900;
                  text-transform: uppercase;
                  letter-spacing: .35rem;
                  text-align: center;
                  margin: 1rem auto 0px auto ;
              }

              h4 {
                  text-align: left;
                  text-transform: uppercase;
                  font-weight: 900;
                  font-size: 1.2rem;
                  letter-spacing: .1rem;
              }

              h6 {
                  font-size: .8rem;
                  font-weight:700;
                  color: #D22630;
                  text-transform: uppercase;
              }

              p {
                  margin-top: .8rem;
              }



              hr {
                  display: inline-block;
                  height: 2px;
                  width: 100%;
                  margin-top: .5rem;
                  background-color: #D22630;
              }

              .link {
                  color: #D22630;
                  margin-top: 4rem;
                  font-weight: 700;
                  font-size: .8rem;
                  float: right;
              }

              .clearFloat {
                  clear: both;
              }

          `}</style>
        </section>
    )
}

export default FeaturedStaff;