import { useState } from "react";
import { baseURL, getPosts, getTagByValue } from "@lib/api";
import { useQuery, useQueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'

import Select from "react-select";
import Layout from "@components/layouts/Layout";
import Loarder from "@components/elements/Loader";
import CardList from "@components/layouts/CardList";
import Pagination from "@components/modules/Pagination";

const postLimit = 9

const fetchPosts = async (key) => {

  // Pulls in and stringifys the types passed to React Query
  const type = key.queryKey[1].type.map((type) => `type=${type}`);
  const typeQueryString = type.join("&");

  // Pulls in and stringifys the tags passed to React Query
  const tagIDs = key.queryKey[2].tags.map((id) => `tags.id=${id}`);
  const tagQueryString = tagIDs.join("&");


  // Pulls in and stringifys the sort passed to React Query
  const sortQuery = key.queryKey[3].sort;

  
  // Queries posts when type & tag params are passed
  if (tagQueryString && typeQueryString && sortQuery) {
    const fetchedPosts = await fetch(
      `${baseURL}/posts?_sort=id:${sortQuery}&_limit=${postLimit}&${typeQueryString}&${tagQueryString}`
    );
    return fetchedPosts.json();
  }

  if (tagQueryString  && sortQuery) {
    const fetchedPosts = await fetch(
      `${baseURL}/posts?_sort=id:${sortQuery}&_limit=${postLimit}&${tagQueryString}`
    );
    return fetchedPosts.json();
  }

  if (typeQueryString && sortQuery) {
    const fetchedPosts = await fetch(
      `${baseURL}/posts?_sort=id:${sortQuery}&_limit=${postLimit}&${typeQueryString}`
    );
    return fetchedPosts.json();
  }

  if (tagQueryString && typeQueryString) {
    const fetchedPosts = await fetch(
      `${baseURL}/posts?_sort=id:DESC&_limit=${postLimit}&${typeQueryString}&${tagQueryString}`
    );
    return fetchedPosts.json();
  }

  if (sortQuery) {
    const fetchedPosts = await fetch(`${baseURL}/posts?_sort=id:${sortQuery}&_limit=${postLimit}`);
    return fetchedPosts.json();
  }

  // Queries posts when tag params are passed
  if (tagQueryString) {
    const fetchedPosts = await fetch(`${baseURL}/posts?_sort=id:DESC&_limit=${postLimit}&${tagQueryString}`);
    return fetchedPosts.json();
  }

  // Queries posts when type params are passed
  if (typeQueryString) {
    const fetchedPosts = await fetch(`${baseURL}/posts?_sort=id:DESC&_limit=${postLimit}&${typeQueryString}`);
    return fetchedPosts.json();
  }

  // Re-fetches posts when stale or reset
  const fetchedPosts = await getPosts(9, 0 ,"desc");
  return fetchedPosts
  
};

export default function Home({ posts, tags, types, sort, initialQueryType, initialQuery }) {
  // React-Qyery configuration & state
  const queryClient = useQueryClient();
  // Sets initial queries based on URL params
  const [type, setType] = useState(initialQueryType === 'type' ? [initialQuery.type] : []);
  const [tagID, setTagID] = useState(initialQueryType === 'tag' ? [initialQuery.id] : []);
  const [sortID, setSortID] = useState(null);

  const { data, status } = useQuery(
    ["posts", { type: type }, { tags: tagID }, { sort: sortID}], fetchPosts,{ initialData: posts, keepPreviousData: true}
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
      <Layout title='Explore' description=''>
        <div className="container mx-auto px-3 xl:px-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 sm:grid-cols-1 gap-6 pt-8">
            <Select
              defaultValue={initialQueryType === 'tag' ? [initialQuery] : [null]}
              className="lg:col-span-2"
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
              defaultValue={initialQueryType === 'type' ? [types.find( ({ label }) => label === initialQuery.type )] : [null]}
              className="lg:col-span-2"
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

            <Select
              className="lg:col-span-1 md:col-span-2"
              styles={selectCustomStyles}
              getOptionLabel={(option) => option.label}
              getOptionValue={(option) => option.value}
              options={sort}
              instanceId="sort"
              placeholder="Sort by date"
              onChange={value => setSortID(value.value)}
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

        
        <div className="container mx-auto px-3 xl:px-20">
        <Pagination 
          displaying={9}
          results={11}
          page={1}
          totalPages={2}
        />
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {

  // TODO: Use API for Types
  const types = [
    { value: "0", label: "Article" },
    { value: "1", label: "Podcast" },
    { value: "2", label: "Video" },
    { value: "3", label: "Event" },
    { value: "4", label: "Exhibition" },
    { value: "5", label: "Interview" },
    { value: "6", label: "Opinion" },
  ];

  const sort = [
    { value: "desc", label: "Newest" },
    { value: "asc", label: "Oldest" }
  ];
  
  const posts = await getPosts(9, 0, "desc");
  const tags = await fetch(`${baseURL}/tags`);
  const tagsData = await tags.json();
  const initialQuery = context.query.tags ? await getTagByValue(context.query.tags) : context.query.type ? context.query : false
  const initialQueryType = context.query.tags ? 'tag' : context.query.type ? 'type' : false

  return {
    props: {
      posts: posts,
      tags: tagsData,
      initialQueryType, 
      initialQuery,
      types,
      sort
    }
  }
}
