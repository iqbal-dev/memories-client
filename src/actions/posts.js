import * as api from "../api";
import {
  CREATE,
  DELETE,
  END_LOADING,
  FETCH_ALL,
  FETCH_BY_SEARCH,
  FETCH_POST,
  LIKE,
  START_LOADING,
  UPDATE,
} from "../constants/actionType";

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPosts(page);
    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};
export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPost(id);
    dispatch({ type: FETCH_POST, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};
export const getPostBySearch = (search) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPostsBySearch(search);
    dispatch({ type: FETCH_BY_SEARCH, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {}
};
export const createPost = (newPost, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createPosts(newPost);
    history.push(`/posts/${data._id}`);
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updatedPost = (id, updatePost) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, updatePost);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  await api.deletePost(id);
  dispatch({ type: DELETE, payload: id });
};

export const updateLike = (id) => async (dispatch) => {
  try {
    const { data } = await api.updateLike(id);
    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
