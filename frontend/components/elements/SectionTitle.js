
function SectionTitle(props) {

    return (
        <section className="container mx-auto px-3 xl:px-20">

        <h4>{props.title}</h4>

  
          <style jsx>{`
              h4 {
                  margin-top: 3rem;
                  font-size: 1.5rem;
                  text-align: center;
                  text-transform: uppercase;
                  letter-spacing: .2rem;
                  font-weight: 900;
                  z-index: 200;
              }

          `}</style>
        </section>
    )
  }
  
  export default SectionTitle;