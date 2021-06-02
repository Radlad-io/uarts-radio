// frontend/pages/index.js
import useSWR from "swr";
import Link from "next/link";
import { useRouter } from "next/router";
import { fetchQuery } from "../utilities/utils";
import { baseURL } from "@lib/api";

import { SortAscendingIcon, SearchIcon } from "@heroicons/react/solid";
import Layout from "@components/layouts/Layout";
import Tag from "@components/elements/Tag";
import Footer from "@components/modules/Footer";
import CardList from "@components/layouts/CardList";
import Loarder from "@components/elements/Loader";

export default function Home({ tags }) {
  // TODO: This is a temporary fetch method. Figure out how to use Graphql via SWR or React-Query
  const endpoint = `${baseURL}/posts?_sort=id:DESC`;

  // TODO: Replace fetcher with graphql implementation
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR(endpoint, fetcher, { refreshInterval: 60000 });

  // if (error) {
  //     return (
  //       <LoadingStyle>
  //         {`Failed to load data.
  //           ${error}
  //         `}
  //       </LoadingStyle>
  //     )
  // }

  // if (!data) {
  //     return (
  //       <LoadingStyle>
  //         Loading...
  //       </LoadingStyle>
  //     )
  // }

  // if(data){
  //   console.log(data)
  // }

  return (
    <>
      <Layout title="UArts Radio" description="">
        <div className="container mx-auto px-3 xl:px-20">
          <div className="mt-1 flex rounded-md shadow-sm mt-10">
            <div className="relative flex items-stretch flex-grow focus-within:z-10">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                type="text"
                name="email"
                id="email"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none pl-10 sm:text-sm border-gray-300 bg-gray-100"
                placeholder="Search"
              />
            </div>
            <button className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500">
              <SortAscendingIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              <span>Sort</span>
            </button>
          </div>

          {tags.map((tag) => (
            <Tag tag={tag} />
          ))}
        </div>
        {/* TODO: Fix the loading height issue here */}

        {data ? <CardList data={data} /> : ""}

        <Footer />
      </Layout>
      <style jsx>
        {`

        `}
      </style>
    </>
  );
}

export async function getServerSideProps({ query }) {
  const tags = await fetchQuery("tags");
  return {
    props: {
      tags,
    },
  };
}
