import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import { baseUrl } from '../utilities/utils'

// TODO: Replace with Keen Slider
function Carousel({ content }) {
    // console.log(content)
    return (
        <>
        <section className="container mx-auto px-3 xl:px-20">
            <AwesomeSlider>
                {content.media.map((media) => (
                    <div data-src={ baseUrl + media.url } />
                ))}
            </AwesomeSlider>

        </section>

  
          <style  jsx>{`
            section {
                margin: 5rem auto 6rem auto;
            }
          `}</style>
          
        </>
    )
  }
  
  export default Carousel;