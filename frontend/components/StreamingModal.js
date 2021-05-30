import useSWR from 'swr'
import { useState } from 'react';
import { motion } from 'framer-motion'
import styled from 'styled-components'
import { baseURL } from '@lib/api';

const fetcher = (...args) => fetch(...args).then(res => res.json())

const StreamingOverlay = styled(motion.div)`
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    top: 0;
    right: 0;
    z-index: 5;
    width: 100vw;
    height: 100vh;
    background-color: rgba(255,255,255,.95);
`

const EmbedStyle = styled(motion.div)`
    position: fixed;
    display: block;
    margin: auto;
    z-index: 5;
`

const CloseButton = styled(motion.div)`
    display: block;
    position: fixed;
    right: 20px;
    top: 20px;
    z-index: 500;

`
const StreamingBanner = styled(motion.div)`
  display: block;
  position: fixed;
  z-index: 500;
  bottom: 50px;
  writing-mode: vertical-rl;
  text-orientation: upright; 
  background-color: #D22630;
  color: white;
  text-transform: uppercase;
  font-weight: 700;
  padding: 15px 8px 15px 15px;
  cursor: pointer;
`

const ModalMotionVariants = {
  open: {
      x: "0",
      transition: {
        duration: .6,
        type: 'easeIn'
    },
  },
  closed: {
      x: "-150vw",
      transition: {
        duration: .6,
        type: 'easeIn'
    },
  },
}

const BannerMotionVariants = {
    streaming: {
        x: "0",
        transition: {
          duration: .4,
          type: 'easeIn'
      },
    },
    notStreaming: {
        x: "-40px",
        transition: {
          duration: .4,
          type: 'easeIn'
      },
    },
  }


function StreamingModal() {

    //TODO: Fix data fetching
    // const{ data, error } = useSWR(`${baseURL}/test`, fetcher)

    const [ streamingState, setStreamingState ] = useState(true)
    const [ open, setOpen] = useState(false)

    // if (error) {
    //   console.log("Error")
    // }
  
    // if (!data) {
    //   console.log("No data")
    // }

    // if (data != null) {
    //   console.log(data)
    // }


  return (
    <> 
        <StreamingOverlay
            variants={ModalMotionVariants}
            animate={open === true ? 'open' : 'closed'}
            initial={"closed"}
        >
            <CloseButton
                onClick={() => setOpen(!open)}
                whileHover={{ scale: 1.5 }}
                whileTap={{ scale: .9 }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="black">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </CloseButton>

            <EmbedStyle>
                <iframe width="900" height="505" src="https://www.youtube.com/embed/jnnjLmsV_R0" title="YouTube video player" frameBorder="0" autoPlay="0" color="white" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen="1"></iframe>
            </EmbedStyle>
        </StreamingOverlay>
        <StreamingBanner
          variants={BannerMotionVariants}
          animate={streamingState === true ? 'streaming' : 'notStreaming'}
          onClick={() => setOpen(!open)}
          initial={streamingState ? "streaming" : "notStreaming"}
        >
          Watch Now
        </StreamingBanner>
    </>
  )

}



export default StreamingModal;