
function Loader() {

  return (
    <>
    <div className="classic-5"></div>

    <style jsx>{`

        [class*=classic]:before {
            content:"Loading...";
        }

        .classic-5 {
            font-weight: bold;
            font-family: monospace;
            font-size: 30px;
            clip-path: inset(0 100% 0 0);
            animation:c5 2s steps(11) infinite;
        }
        @keyframes c5 {to{clip-path: inset(0 -1ch 0 0)}}

    `}
  </style>
  </>
  )
}

export default Loader

