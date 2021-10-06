import Link from 'next/link'
import { useRouter } from "next/router";


function Navbar() {
    const router = useRouter()
    return (
        <>
            <header>
                <div className="relative pt-6 pb-4 container mx-auto px-3 xl:px-20">
                    <nav className=" mx-auto flex items-center justify-between px-4 sm:px-6" aria-label="Global">
                        <div className="flex items-center flex-1">
                        <div className="flex items-center justify-between w-full md:w-auto">
                            <Link href="/">
                                <a>
                                    <span className="sr-only">UArts Radio</span>
                                    <h1 className="tracking-wider">UArts Radio</h1>
                                </a>
                            </Link>
                        </div>
                        </div>
                        <div className="hidden md:block md:ml-10 md:space-x-10 px-5">
                        <ul>
                            <li className={router.pathname == "/explore" ? "active" : ""}>
                            <Link href="/explore"><a className="font-medium text-gray-700 hover:text-gray-900">Explore</a></Link>
                            </li>
                            <li className={router.pathname == "/shows" ? "active" : ""}>
                            <Link href="/shows"><a className="font-medium text-gray-700 hover:text-gray-900">Shows</a></Link>
                            </li>
                            <li className={router.pathname == "/staff" ? "active" : ""}>
                            <Link href="/staff"><a className="font-medium text-gray-700 hover:text-gray-900">Staff</a></Link>
                            </li>
                            <li className={router.pathname == "/about" ? "active" : ""}>
                            <Link href="/about"><a className="font-medium text-gray-700 hover:text-gray-900 hover:text-white">About</a></Link>
                            </li>
                        </ul>

                        </div>
                        <div className="hidden md:block text-right">
                        <span className="inline-flex rounded-md shadow-md ring-1 ring-black ring-opacity-5">
                            <a href="/listen-now" className="listen-now inline-flex items-center px-4 py-2 border border-transparent text-base text-white font-medium">
                            Listen Now
                            </a>
                        </span>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="hamburger h-6 w-6 ml-8" viewBox="0 0 24 24" stroke="black">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </nav>
                </div>

            </header>
            <style jsx>{`

            h1 {
                text-transform: uppercase;
                font-size: 1.5rem;
                font-weight: 900;
            }
            
            li {
            display: inline-block;
            margin-right: 1rem;
            }
    
            a {
            text-transform: uppercase;
            }
    
            .listen-now {
            background-color: #D22630;
            }
    
            .listen-now:hover {
            background-color: #DB5159;
            color: white;
            }
    
            .active {
            border-bottom: 2px solid #D22630;
            }

            .active > a {
                color: black;
                font-weight: 700;
            }

            .hamburger:hover {
                stroke: #D22630;
            }
    
            `}
            </style>
        </>
    )
}

export default Navbar