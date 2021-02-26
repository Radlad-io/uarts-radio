
import Markdown from './Markdown'
import VideoEmbed from './VideoEmbed'
import BlockQuote from './BlockQuote'
import FeaturedStaff from './FeaturedStaff'
import Carousel from './Carousel'
import FeaturedPosts from './FeaturedPosts'

function ContentParser({ content }) {
    
    // TODO: USE A SWITCH
    if (content.__typename === 'ComponentContentParagraph'){
        return <Markdown key={content.id} content={content} />
    } else if (content.__typename === 'ComponentContentVideoEmbed'){
        return <VideoEmbed key={content.id} content={content} />
    } else if (content.__typename === 'ComponentContentBlockQuote'){
        return <BlockQuote key={content.id} content={content} />
    } else if (content.__typename === 'ComponentContentFeaturedStaff'){
        return <FeaturedStaff key={content.id} staff={content} />
    } else if (content.__typename === 'ComponentContentCarousel'){
        return <Carousel key={content.id} content={content} />
    } else if (content.__typename === 'ComponentContentFeaturedPosts'){
        return <FeaturedPosts key={content.id} content={content} />
    }

  }
  
  export default ContentParser;