import axios from "axios";
const API = axios.create({
  baseURL: "https://secure-atoll-13821.herokuapp.com",
});
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPostsBySearch = (searchQuery) =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );
export const createPosts = (newPost) => API.post("/posts", newPost);
export const updatePost = (id, updatePost) =>
  API.patch(`/posts/${id}`, updatePost);

export const deletePost = (id) => API.delete(`/posts/${id}`);
export const updateLike = (id) => API.patch(`/posts/${id}/likePost`);

export const signIn = (formData) => API.post("/user/signIn", formData);
export const signUp = (formData) => API.post("/user/signUp", formData);
