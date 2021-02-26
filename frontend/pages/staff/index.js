// frontend/pages/index.js
import Link from 'next/link'
import Image from 'next/image'
import { baseUrl, fetchQuery } from '../../utilities/utils'

import Layout from '../../components/Layout'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export default function Home({ staff }) {
  return (
    <Layout title='Staff' description=''>
      <Navbar />
      <div className="container mx-auto px-3 xl:px-20">

        <section className='grid grid-cols-1 sm:grid-cols-2 py-10 gap-1 sm:gap-6 lg:gap-10 items-stretch md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4'>
          {staff.map((staff) => (
            <Link href={`/staff/${staff.slug}`}>
              <div>
                <Image
                  className='w-full sm:w-64'
                  src={`${baseUrl}${staff.profile_image.url}`}
                  width={600}
                  height={600}
                  preload='true'
                  objectFit='cover'
                />
                <h2>{staff.name}</h2>
                <h6>{staff.major.replace("_", " ")}</h6>

              </div>
            </Link>
          ))}
        </section>
      </div>

      <Footer />

      <style jsx>{`

                h2 {
                    font-size: 1.5rem;
                    font-weight: 900;
                    text-transform: uppercase;
                    letter-spacing: .35rem;
                    margin: 1rem auto 0px auto ;
                }

                h6 {
                    font-size: .8rem;
                    font-weight:700;
                    color: #D22630;
                    text-transform: uppercase;
                }

          `}</style>

    </Layout>
  )
}

export async function getServerSideProps() {
  const staff = await fetchQuery('users')
  return {
    props: {
      staff
    }
  }
}