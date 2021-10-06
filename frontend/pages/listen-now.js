// frontend/pages/listen-now.js


import Layout from '@components/layouts/Layout'
import Footer from '@components/modules/Footer'
import SectionTitle from '@components/elements/SectionTitle'


export default function Home({ userAgent }) {

  return (
    <Layout title='Listen' description=''>
      <div className="container mx-auto px-3 xl:px-20 mb-20">
        <audio controls src="http://99.198.118.250:8245/stream">
          <source src="http://99.198.118.250:8245/stream" type="audio/mpeg"></source>
          Your browser does not support the audio element.
        </audio>
        <p>{userAgent}</p>
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

export async function getInitialProps(context) {
  let userAgent;
  if (context.req) { // if you are on the server and you get a 'req' property from your context
    userAgent = context.req.headers['user-agent'] // get the user-agent from the headers
  } else {
    userAgent = navigator.userAgent // if you are on the client you can access the navigator from the window object
  }
  console.log(userAgent)
  return {
    props: {
      userAgent
    }, // will be passed to the page component as props
  }
}
