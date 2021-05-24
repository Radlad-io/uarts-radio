import Link from 'next/link'
import { useRouter } from "next/router";


function Tag({ tag }) {
    const router = useRouter()
    return (
        <>
            <Link href={`/explore?tags.slug=${tag.slug}`}><a className={router.pathname == `/explore?tags.slug=${tag.slug}` ? "active" : "tag"}>{tag.tag}</a></Link>

            <style jsx>{`

                .tag {
                    display: inline-block;
                    font-size: .8rem;
                    margin: 1rem 1rem 0 0;
                    background-color: #D22630;
                    color: white;
                    padding: .3rem .6rem .4rem .6rem;
                    text-transform: uppercase;
                    letter-spacing: .1rem;
                    font-weight: 700;
                }

                .tag:hover {
                    cursor:pointer;
                    color: white;
                    background-color: #DB5159;
                }

          `}</style>
        </>
    )
}

export default Tag;