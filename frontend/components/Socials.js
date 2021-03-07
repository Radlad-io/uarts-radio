import Link from 'next/link'
import Image from 'next/image'

function Socials({ social }) {
    console.log(social)
    if (social.platform === 'Instagram'){
        return (
            <>
                <Link href={social.url}>
                    <a className="">
                        <Image
                            src="/instagram-red.svg"
                            width={34}
                            height={34}
                        />
                    </a>
                </Link>
                <style jsx>{`
                    a {
                        display: inline-block;
                        margin: 0rem .5rem;
                    }
                `}</style>
            </>
        )
    } else if (social.platform === 'Facebook'){
        return (
            <>
                <Link href={social.url}>
                    <a className="">
                        <Image
                            src="/facebook-red.svg"
                            width={38}
                            height={38}
                        />
                    </a>
                </Link>
                <style jsx>{`
                     a {
                        display: inline-block;
                        margin: 0rem .5rem;
                    }

                `}</style>
            </>
        )
    }
}
  
  
  export default Socials;