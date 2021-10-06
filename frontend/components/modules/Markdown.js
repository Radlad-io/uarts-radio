import ReactMarkdown from "react-markdown";

function Markdown({ content }) {
  return (
    //   TODO: update MDX parser https://nextjs.org/blog/markdown
    <section className="container mx-auto px-3 xl:px-20">
          <div className={content.drop_cap ? 'drop_cap': ''}>
              <ReactMarkdown key={content.id} source={content.body} escapeHtml={false}  />
          </div>
    </section>
  )
}

export default Markdown;

