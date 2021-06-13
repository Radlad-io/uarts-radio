import { useState } from "react";
import { baseURL } from "@lib/api";
import { useQuery, useQueryClient } from "react-query";

import Select from "react-select";
import Layout from "@components/layouts/Layout";
import Footer from "@components/modules/Footer";
import Loarder from "@components/elements/Loader";
import CardList from "@components/layouts/CardList";
import { SearchIcon } from "@heroicons/react/solid";

const getPosts = async (key) => {

  const type = key.queryKey[1].type.map(type => `type=${type}`)
  const typeQueryString = type.join('&')

  const tagIDs = key.queryKey[2].tags.map(id => `tags.id=${id}`)
  const tagQueryString = tagIDs.join('&')

  if(tagQueryString && typeQueryString) {
    const posts = await fetch(`${baseURL}/posts?${typeQueryString}&${tagQueryString}`);
    return posts.json();
  }

  if(tagQueryString) {
    const posts = await fetch(`${baseURL}/posts?${tagQueryString}`);
    return posts.json();
  }

  if(typeQueryString) {
    const posts = await fetch(`${baseURL}/posts?${typeQueryString}`);
    return posts.json();
  }

  const posts = await fetch(`${baseURL}/posts`);
  return posts.json();
};


export default function Home({ posts, tags, types }) {
  const queryClient = useQueryClient();

  const [ type, setType ] = useState(null) 
  const [ tagID, setTagID ] = useState([]) 

  const { data, status } = useQuery(["posts", {type: type}, {tags: tagID}], getPosts, {
    initialData: posts,
  });

  const handleTags = (values) => {
    console.log(values);
  };

  const handleTypes = (types) => {
    console.log(types);
  };

  // Converts a string to Title Case. Used to adjust mis matched casing of tags
  String.prototype.toTitleCase = function () {
    return this.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

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
    control: (base) => ({
      ...base,
      border: 0,
      boxShadow: "none",
      backgroundColor: "white",
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
          <div className="flex-1 flex mt-6">
            <form className="w-full flex md:ml-0" action="#" method="GET">
              <label htmlFor="search_field" className="sr-only">
                Search
              </label>
              <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-5" aria-hidden="true" />
                </div>
                <input
                  id="search_field"
                  className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                  placeholder="Search"
                  type="search"
                  name="search"
                />
              </div>
            </form>
          </div>
          <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-0">
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

        <Footer />
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  const API_URL = `https://uarts-radio.kevinmerinsky.com/content`;

  const posts = await fetch(`${baseURL}/posts`);
  const postsData = await posts.json();
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
      posts: postsData,
      tags: tagsData,
      types,
    },
  };
}
