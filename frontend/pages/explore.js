import { useState } from "react";
import { baseURL, getPosts } from "@lib/api";
import { useQuery, useQueryClient } from "react-query";

import Select from "react-select";
import Layout from "@components/layouts/Layout";
import Loarder from "@components/elements/Loader";
import CardList from "@components/layouts/CardList";
import { SortAscendingIcon, SearchIcon } from "@heroicons/react/solid";

const fetchPosts = async (key) => {

  // Pulls in and stringifys the types passed to React Query
  const type = key.queryKey[1].type.map((type) => `type=${type}`);
  const typeQueryString = type.join("&");

  // Pulls in and stringifys the tags passed to React Query
  const tagIDs = key.queryKey[2].tags.map((id) => `tags.id=${id}`);
  const tagQueryString = tagIDs.join("&");

  // Queries posts when type & tag params are passed
  if (tagQueryString && typeQueryString) {
    const fetchedPosts = await fetch(
      `${baseURL}/posts?_sort=id:DESC&${typeQueryString}&${tagQueryString}`
    );
    return fetchedPosts.json();
  }

  // Queries posts when tag params are passed
  if (tagQueryString) {
    const fetchedPosts = await fetch(`${baseURL}/posts?_sort=id:DESC&${tagQueryString}`);
    return fetchedPosts.json();
  }

  // Queries posts when type params are passed
  if (typeQueryString) {
    const fetchedPosts = await fetch(`${baseURL}/posts?_sort=id:DESC&${typeQueryString}`);
    return fetchedPosts.json();
  }

  // Re-fetches posts when stale or reset
  const fetchedPosts = await getPosts(9);
  return fetchedPosts
  
};

export default function Home({ posts, tags, types }) {

  // React-Qyery configuration & state
  const queryClient = useQueryClient();
  const [type, setType] = useState([]);
  const [tagID, setTagID] = useState([]);
  const { data, status } = useQuery(
    ["posts", { type: type }, { tags: tagID }], fetchPosts,{initialData: posts}
  );

  // Converts a string to Title Case. Used to adjust mis matched casing of tags
  String.prototype.toTitleCase = function () {
    return this.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  // Styling for React-select
  const selectCustomStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: "1px dotted lightgray",
      color: state.isSelected ? "#d22630" : "black",
      padding: 15,
      borderRadius: 0,
      backgroundColor: state.isFocused ? "lightgray" : "white",
      border: state.isSelected ? "darkgray" : "lightgray",
      oxShadow: "none",
    }),
    multiValue: (styles) => ({
      ...styles,
      backgroundColor: "lightgray",
      borderRadius: 2,
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
  };

  return (
    <>
      <Layout title="UArts Radio" description="">
        <div className="container mx-auto px-3 xl:px-20">
          <div className="mt-1 flex shadow-sm mt-6 mb-2 mx-6">
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
                className="focus:ring-gray-500 focus:border-gray-500 block w-full rounded-none pl-10 sm:text-sm border-gray-300 bg-gray-100"
                placeholder="Search"
              />
            </div>
            <button className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500">
              <SortAscendingIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              <span>Sort & Filter</span>
            </button>
          </div>
          <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-6 mx-6 p-6 bg-gray-100">
            <Select
              styles={selectCustomStyles}
              getOptionLabel={(option) => `${option.tag.toTitleCase()}`}
              getOptionValue={(option) => option.id}
              options={tags}
              instanceId="tags"
              isMulti
              placeholder="Filter by tags"
              onChange={(values) => setTagID(values.map((tag) => tag.id))}
              theme={(theme) => ({
                ...theme,
                borderRadius: 0,
                colors: {
                  ...theme.colors,
                  primary: "black",
                  danger: "#d22630",
                  dangerLight: "#c2c2c2",
                },
              })}
            />

            <Select
              styles={selectCustomStyles}
              getOptionLabel={(option) => option.label}
              getOptionValue={(option) => option.value}
              options={types}
              instanceId="types"
              isMulti
              placeholder="Filter by types"
              onChange={(values) => setType(values.map((type) => type.label))}
              theme={(theme) => ({
                ...theme,
                borderRadius: 0,
                colors: {
                  ...theme.colors,
                  primary: "black",
                  danger: "#d22630",
                  dangerLight: "#c2c2c2",
                },
              })}
            />
          </div>
        </div>

        {status === "loading" && (
          <div className="container mx-auto px-3 xl:px-20">
            <Loarder />
          </div>
        )}

        {status === "error" && (
          <div className="container mx-auto px-3 xl:px-20">
            <p>An error has occured</p>
          </div>
        )}

        {status === "success" && <CardList data={data} />}

      </Layout>
    </>
  );
}

export async function getServerSideProps() {

  const posts = await getPosts(9);
  const tags = await fetch(`${baseURL}/tags`);
  const tagsData = await tags.json();

  const types = [
    { value: "1", label: "Article" },
    { value: "2", label: "Podcast" },
    { value: "3", label: "Video" },
    { value: "4", label: "Event" },
    { value: "5", label: "Exhibition" },
    { value: "6", label: "Interview" },
    { value: "7", label: "Opinion" },
  ];

  return {
    props: {
      posts: posts,
      tags: tagsData,
      types,
    },
  };
}
