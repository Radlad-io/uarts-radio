// frontend/pages/listen-now.js


import Layout from '@components/layouts/Layout'
import Footer from '@components/modules/Footer'
import SectionTitle from '@components/elements/SectionTitle'


export default function Home({ posts }) {

  return (
    <Layout title='Listen' description=''>

      <div className="container mx-auto px-3 xl:px-20 mb-20">
        <audio controls src="http://99.198.118.250:8245/stream"></audio>
      </div>
       
      <Footer />
      <style jsx>{`
        audio {
          width: 100%;
        }
      `}</style>
    </Layout>
  )
}
