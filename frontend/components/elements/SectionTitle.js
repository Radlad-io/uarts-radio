import { useEffect } from 'react';
import styled from 'styled-components'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer';


const MaskStyle = styled.div`
 margin: 2.5rem 0 1.5rem 0 ;
 overflow: hidden;
`

const AncorStyle = styled.a`
    display: inline-block;
    &:hover {
        color: black;
    }
`

const TitleStyle = styled(motion.h4)`
    margin-top: 3rem;
    font-size: 1.8rem;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: .15rem;
    font-weight: 900;
    z-index: 200;
`


const UnderlineStyle = styled(motion.div)`
    width: 100%;
    height: 6px;
    background-color: #D22630;
`

const TitleVariants = {
    hidden: { 
        opacity: 0 ,
        y:40
    },
    visible: {
        opacity: 1,
        y:0,
        transition: {
            duration: 0.5
        }
    }
}

const UnderlineVariants = {
    hidden: { 
        opacity: 0,
        width: 0,
        },
    visible: {
        opacity: 1,
        width: "100%",
        transition: {
            delay: .5,
            duration: 0.75
        }
    }
}



function SectionTitle(props) {

    const controls = useAnimation();
    const { ref, inView } = useInView({threshold: 1, delay: 200});

    useEffect(() => {
        if (inView) {
          controls.start('visible');
        }
        if (!inView) {
          controls.start('hidden');
        }
      }, [controls, inView]);

    return (
        <div className="container mx-auto px-3 xl:px-20">
            <MaskStyle>
                <AncorStyle>
                    <TitleStyle
                        ref={ref}
                        initial="hidden"
                        animate={controls}
                        variants={TitleVariants}
                    >
                        {props.title}
                    </TitleStyle>
                    <UnderlineStyle 
                    ref={ref}
                        className="underline"
                        initial="hidden"
                        animate={controls}
                        variants={UnderlineVariants}
                    ></UnderlineStyle>
                </AncorStyle>
            </MaskStyle>
        </div>
    )
  }
  
  export default SectionTitle;