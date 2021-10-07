export const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

async function fetchAPI(query, { variables } = {}) {
  const req = await fetch(`${baseURL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const res = await req.json()

  if (res.errors) {
    console.error(res.errors)
    throw new Error('Failed to fetch API')
  }

  return res.data
}

export async function previewPostById(id) {
  const data = await fetchAPI(
      `
      query {
          posts( publicationState: PREVIEW, where:{id:${id}} ) {
              title
              slug
              description
              published_at
          }
        }
      `
  )    
  return data?.posts[0]
}

export async function previewPostBySlug(slug) {
    const data = await fetchAPI(
        `
        query {
            posts( publicationState: PREVIEW, where:{slug:"${slug}"} ) {
                title
                slug
                description
                published_at
                tags {
                  id
                  tag
                  slug
                }
                cover_image {
                  url
                }
                authors {
                  name
                  slug
                  profile_image {
                    url
                  }
                }
                editors {
                  name
                  profile_image {
                    url
                  }
                }
                photographers {
                  name
                  profile_image {
                    url
                  }
                }
                content {
                  __typename
                  
                  ... on ComponentContentParagraph {
                    id
                    body
                  }
                  
                  ... on ComponentContentBlockQuote {
                    id
                    quote
                    first_name
                    last_name
                    citation
                    citation_url
                    image {
                      url
                    }
                  }
                  
                  ... on ComponentContentFeaturedStaff {
                    id
                    users {
                      name
                      major
                      short_biography
                      profile_image {
                        url
                      }
                    }
                  }
                  
                  ... on ComponentContentVideoEmbed {
                    id
                    URL
                    embed_caption
                  }
                  
                  ... on ComponentContentCarousel {
                    id
                    media {
                      url
                    }
                  }
                  
                  ... on ComponentContentFeaturedPosts {
                    id
                    title
                    posts {
                      title
                      description
                      published_at
                      cover_image{
                        url
                      }
                    }
                  }
                }
            }
          }

        `
    )
    return data?.posts[0]
}

export async function getPostBySlug(slug) {
  const data = await fetchAPI(
      `
      query {
          posts( publicationState: LIVE, where:{slug:"${slug}"} ) {
              title
              type
              slug
              description
              published_at
              tags {
                id
                tag
                slug
              }
              cover_image {
                url
              }
              authors {
                name
                slug
                profile_image {
                  url
                }
              }
              editors {
                name
                slug
                profile_image {
                  url
                }
              }
              photographers {
                name
                slug
                profile_image {
                  url
                }
              }
              content {
                __typename
                
                ... on ComponentContentParagraph {
                  id
                  body
                }
                
                ... on ComponentContentBlockQuote {
                  id
                  quote
                  first_name
                  last_name
                  citation
                  citation_url
                  image {
                    url
                  }
                }
                
                ... on ComponentContentFeaturedStaff {
                  id
                  users {
                    name
                    major
                    short_biography
                    profile_image {
                      url
                    }
                  }
                }
                
                ... on ComponentContentVideoEmbed {
                  id
                  URL
                  embed_caption
                }
                
                ... on ComponentContentCarousel {
                  id
                  media {
                    url
                  }
                }
                
                ... on ComponentContentFeaturedPosts {
                  id
                  title
                  posts {
                    title
                    description
                    published_at
                    cover_image{
                      url
                    }
                  }
                }
              }
          }
        }

      `
  )
  return data?.posts[0]
}

export async function getPosts(limit, start, sort) {
  
  const data = await fetchAPI(
      `
      query {
          posts( publicationState: LIVE,
          ${limit ? ", limit: "+limit : ""} 
          ${start ? ", start: "+start : ""}
          ${sort ? ', sort: "id:'+sort+'"' : ""}
          ){
              title
              slug
              type
              description
              published_at
              tags {
                id
                tag
                slug
              }
              cover_image {
                url
                formats
              }
              authors {
                name
                slug
                profile_image {
                  url
                }
              }
              editors {
                name
                slug
                profile_image {
                  url
                }
              }
              photographers {
                name
                slug
                profile_image {
                  url
                }
              }
              content {
                __typename
                
                ... on ComponentContentParagraph {
                  id
                  body
                }
                
                ... on ComponentContentBlockQuote {
                  id
                  quote
                  first_name
                  last_name
                  citation
                  citation_url
                  image {
                    url
                  }
                }
                
                ... on ComponentContentFeaturedStaff {
                  id
                  users {
                    name
                    major
                    short_biography
                    profile_image {
                      url
                    }
                  }
                }
                
                ... on ComponentContentVideoEmbed {
                  id
                  URL
                  embed_caption
                }
                
                ... on ComponentContentCarousel {
                  id
                  media {
                    url
                  }
                }
                
                ... on ComponentContentFeaturedPosts {
                  id
                  title
                  posts {
                    title
                    description
                    published_at
                    cover_image{
                      url
                    }
                  }
                }
              }
          }
        }

      `
  )
  if(limit === 1) {
    return data?.posts[0]
  }
  
  return data?.posts
}

export async function getShowBySlug(slug) {
  const data = await fetchAPI(
      `
      query {
          shows( publicationState: LIVE, where:{slug:"${slug}"} ) {
              title
              slug
              cover_image{
                url
              }
              cover_video{
                url
              }
              tags {
                id
                tag
                slug
              }
              content {
                __typename
                
                ... on ComponentContentParagraph {
                  id
                  body
                }
                
                ... on ComponentContentBlockQuote {
                  id
                  quote
                  first_name
                  last_name
                  citation
                  citation_url
                  image {
                    url
                  }
                }
                
                ... on ComponentContentFeaturedStaff {
                  id
                  users {
                    name
                    major
                    short_biography
                    profile_image {
                      url
                    }
                  }
                }
                
                ... on ComponentContentVideoEmbed {
                  id
                  URL
                  embed_caption
                }
                
                ... on ComponentContentCarousel {
                  id
                  media {
                    url
                  }
                }
                
                ... on ComponentContentFeaturedPosts {
                  id
                  title
                  posts {
                    title
                    description
                    published_at
                    cover_image{
                      url
                    }
                  }
                }
              }
          }
        }

      `
  )
  return data?.shows[0]
}

export async function getShows(limit) {
  const data = await fetchAPI(
      `
      query {
          shows( publicationState: LIVE ${limit ? ", limit: "+limit : ""} ) {
              title
              slug
              cover_image{
                url
              }
              cover_video{
                url
              }
              tags {
                id
                tag
                slug
              }
              content {
                __typename
                
                ... on ComponentContentParagraph {
                  id
                  body
                }
                
                ... on ComponentContentBlockQuote {
                  id
                  quote
                  first_name
                  last_name
                  citation
                  citation_url
                  image {
                    url
                  }
                }
                
                ... on ComponentContentFeaturedStaff {
                  id
                  users {
                    name
                    major
                    short_biography
                    profile_image {
                      url
                    }
                  }
                }
                
                ... on ComponentContentVideoEmbed {
                  id
                  URL
                  embed_caption
                }
                
                ... on ComponentContentCarousel {
                  id
                  media {
                    url
                  }
                }
                
                ... on ComponentContentFeaturedPosts {
                  id
                  title
                  posts {
                    title
                    description
                    published_at
                    cover_image{
                      url
                    }
                  }
                }
              }
          }
        }

      `
  )
  return data?.shows
}

export async function getStaffBySlug(slug) {
  const data = await fetchAPI(
      `
      query {
        users( where:{slug:"${slug}"} ) {
            name
            interests{
              tag
              slug
            }
            socials{
              platform
              url
            }
            profile_image{
              url
            }
            authored {
              id
              slug
              title
              description
              cover_image {
                url
                formats
              }
              scheduled
              published_at
            }
            edited {
              id
              slug
              title
              description
              cover_image {
                url
                formats
              }
              scheduled
              published_at
            }
            photography {
              id
              slug
              title
              description
              cover_image {
                url
                formats
              }
              scheduled
              published_at
            }
            content {
              __typename
              
              ... on ComponentContentParagraph {
                id
                body
              }
              
              ... on ComponentContentBlockQuote {
                id
                quote
                first_name
                last_name
                citation
                citation_url
                image {
                  url
                }
              }
              
              ... on ComponentContentVideoEmbed {
                id
                URL
                embed_caption
              }
              
              ... on ComponentContentCarousel {
                id
                media {
                  url
                }
              }
              
            }
        }
      }

      `
  )
  return data?.users[0]
}

export async function getStaff(limit) {
  const data = await fetchAPI(
      `
      query {
        users( publicationState: LIVE ${limit ? ", limit: "+limit : ""} ) {
            name
            slug
            short_biography
            interests{
              tag
              slug
            }
            socials{
              platform
              url
            }
            profile_image{
              url
            }
            content {
              __typename
              
              ... on ComponentContentParagraph {
                id
                body
              }
              
              ... on ComponentContentBlockQuote {
                id
                quote
                first_name
                last_name
                citation
                citation_url
                image {
                  url
                }
              }
              
              ... on ComponentContentVideoEmbed {
                id
                URL
                embed_caption
              }
              
              ... on ComponentContentCarousel {
                id
                media {
                  url
                }
              }
              
            }
        }
      }

      `
  )
  return data?.users
}
  
export async function getFeaturedStaff(limit) {
  const data = await fetchAPI(
      `
      query {
        users( publicationState: LIVE ${limit ? ", limit: " + limit : ""} ) {
            name
            slug
            short_biography
            profile_image{
              url
            }
            interests{
              tag
              slug
            }
            profile_image{
              url
              formats
            }
            authored {
              id
            }
            edited {
              id
            }
            photography {
              id
            }
        }
      }

      `
  )
  return data?.users
}

export async function getTags(limit) {
  const data = await fetchAPI(
      `
      query {
        tags( publicationState: LIVE ${limit ? ", limit: " + limit : ""} ) {
            id
            tag
            slug
        }
      }

      `
  )
  return data
}

export async function getTagByValue(value) {
  const data = await fetchAPI(
      `
      query {
        tags(  where:{slug:"${value}"} ) {
            id
            tag
            slug
        }
      }

      `
  )
  return data?.tags[0]
}