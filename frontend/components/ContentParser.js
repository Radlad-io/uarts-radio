
import Markdown from './Markdown'
import VideoEmbed from './VideoEmbed'
import BlockQuote from './BlockQuote'
import FeaturedStaff from './FeaturedStaff'
import Carousel from './Carousel'
import FeaturedPosts from './FeaturedPosts'

function ContentParser({ content }) {
    
    if (content.__component === 'content.paragraph'){
        return <Markdown key={content.id} content={content} />
    } else if (content.__component === 'content.video-embed'){
        return <VideoEmbed key={content.id} content={content} />
    } else if (content.__component === 'content.block-quote'){
        return <BlockQuote key={content.id} content={content} />
    } else if (content.__component === 'content.featured-staff'){
        return <FeaturedStaff key={content.id} staff={content} />
    } else if (content.__component === 'content.carousel'){
        return <Carousel key={content.id} content={content} />
    } else if (content.__component === 'content.featured-posts'){
        return <FeaturedPosts key={content.id} content={content} />
    }

  }
  
  export default ContentParser;