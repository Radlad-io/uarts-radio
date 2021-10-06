// frontend/pages/index.js
import Link from 'next/link'
import Image from 'next/image'
import { getStaff } from '@lib/api'
import { baseUrl, fetchQuery } from '../../utilities/utils'

import Layout from '@components/layouts/Layout'
import Card from '@components/modules/Card'


export default function Home({ staff }) {
  return (
    <Layout title='Staff' description=''>
      <div className="container mx-auto px-3 xl:px-20">

        <section className='grid grid-cols-1 sm:grid-cols-2 py-10 gap-1 sm:gap-6 lg:gap-10 items-stretch md:grid-cols-2 lg:grid-cols-3'>
          {staff.map((staff) => (
            <Card
              slug={`/staff/${staff.slug}`}
              key={staff.id}
              image={staff.profile_image.url}
              type={staff.major}
              title={staff.name}
              description={staff.short_biography ? staff.short_biography : ""}
              date={staff.created_at}
            />
          ))}
        </section>
      </div>

    </Layout>
  )
}

export async function getServerSideProps() {
  const staff = await getStaff()
  return {
    props: {
      staff
    }
  }
}