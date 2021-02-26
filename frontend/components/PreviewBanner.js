
function PreviewBanner() {

    return (
        <>
            <div className="relative bg">
                <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
                    <div className="pr-16 sm:text-center sm:px-16">
                    <p className="text-sm font-medium text-white">
                        <span className="md:hidden">
                            Your in preview mode. This content isn't public.
                        </span>
                        <span className="hidden md:inline">
                            Your in preview mode. This content isn't public.
                        </span>
                        <span className="block sm:ml-2 sm:inline-block">
                        <a href="/api/exit-preview" className="text-white font-bold underline"> Logout <span aria-hidden="true">&rarr;</span></a>
                        </span>
                    </p>
                    </div>
                </div>
            </div>
            <style  jsx>{`
                .bg {
                    background-color: #D22630;
                }
                a:hover {
                    color: black;
                }
            `}</style>
          
        </>
    )
  }

  export default PreviewBanner