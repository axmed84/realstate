import { defer } from "react-router-dom"
import apiRequest from "./apiRequest"

export const singlePageLoader = async ({request,params}) => {
    const res = await apiRequest("/posts/"+params.id)
    return res.data
}

export const listPageLoader = async ({request,params}) => {
    const query = request.url.split("?")[1]

    try {
    const postPromise = apiRequest("/posts?" + query);
    return defer({
      postResponse: postPromise,
    });
  } catch (error) {
    console.error("Failed to load posts:", error);
    throw new Error("Failed to load posts");
  }
}

export const profilePageLoader = async ({request,params}) => {
  const postPromise = await apiRequest("/users/profileposts")
  return defer({
    postResponse: postPromise
  })
}