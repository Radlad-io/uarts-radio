
function VideoEmbed({ content }) {

  if(content.URL.includes("youtube")){
    let source = content.URL.replace("watch?v=","embed/")
      return (
        <section className="container mx-auto px-3 xl:px-20">
        {/* TODO: Make embed this responsive */}
        {/* TODO: Make a URL parser for the "embed" version of the URL */}
        {/* TODO: Either work out the Tailwing aspect-ratio plugin or remove it */}

        <div className="aspect-w-16 aspect-h-9">
          <iframe src={source} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>

          <p className="embed-caption">{content.embed_caption}</p>

          <style jsx>{`
              section {
                margin: 6rem auto;
              }
              
              iframe {
                width: 800px;
                height: 450px;
                margin: 1rem auto .25rem auto;
              }

              .embed-caption {
                  text-align: center;
                  font-size: .85rem;
                  margin: 1em;
                  color: gray;
                  margin-bottom: 1rem;
              }

          `}</style>
        </section>
    )
  } else if (content.URL.includes("vimeo")) {

    let source = content.URL.replace("https://vimeo.com/","https://player.vimeo.com/video/")
    return(
      <section className="container mx-auto px-3 xl:px-20">
      <iframe src={source}  allow="fullscreen; picture-in-picture" allowfullscreen></iframe>
      <p className="embed-caption">{content.embed_caption}</p>

      <style jsx>{`
          section {
            margin: 6rem auto;
          }
          
          iframe {
            width: 800px;
            height: 450px;
            margin: 1rem auto .25rem auto;
          }

          .embed-caption {
              text-align: center;
              font-size: .85rem;
              margin: 1em;
              color: gray;
              margin-bottom: 1rem;
          }

      `}</style>
    </section>
    )
  }
}

export default VideoEmbed;