import { fetchQuery } from '../../utilities/utils'
import { getPreviewPostById } from '../../lib/api'


export default async function preview (req, res) {

    // Check the secret and next parameters
    // This secret should only be known to this API route and the CMS
    if (req.query.secret !== process.env.PREVIEW_SECRET || !req.query.id) {
      return res.status(401).json({ message: 'Invalid token' })
    }
  
    // Fetch the headless CMS to check if the provided `slug` exists
    // getPostBySlug would implement the required fetching logic to the headless CMS
    // const post = await fetchQuery('posts?_publicationState=preview&_limit=1', `&slug=${req.query.slug}`)
    const post = await getPreviewPostById(req.query.id)
  
    // If the slug doesn't exist prevent preview mode from being enabled
    if (!post) {
      return res.status(401).json({ message: 'Invalid slug' })
    }

    // Enable Preview Mode by setting the cookies
    res.setPreviewData({
      maxAge: 60 * 60, // Preview cookie expires after 1 hour
    })
  
    // Redirect to the path from the fetched post
    // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
    res.writeHead(307, { Location: `/posts/${post.slug}` })
    res.end()

  }
  
  