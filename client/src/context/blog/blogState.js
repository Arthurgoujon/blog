import React, { useReducer } from 'react';
import axios from 'axios';
import BlogContext from './blogContext';
import blogReducer from './blogReducer';
import {
  GET_BLOGS,
  ADD_BLOG,
  DELETE_BLOG,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_BLOG,
  FILTER_BLOGS,
  CLEAR_FILTER,
  BLOG_ERROR,
  CLEAR_BLOGS
} from '../types';

const BlogState = props => {
  const initialState = {
    blogs: null,
    current: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(blogReducer, initialState);

  // Get Blogs
  const getBlogs = async () => {
    try {
      const res = await axios.get('/api/blogs');

      dispatch({
        type: GET_BLOGS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: BLOG_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Add Blog
  const addBlog = async blog => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/blogs', blog, config);

      dispatch({
        type: ADD_BLOG,
        payload: res.data
      });
    } catch (err) {
      // dispatch({
      //   type: BLOG_ERROR,
      //   payload: err.response.msg
      // });
    }
  };

  // Delete Blog
  const deleteBlog = async id => {
    try {
      await axios.delete(`/api/blogs/${id}`);

      dispatch({
        type: DELETE_BLOG,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: BLOG_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Update Blog
  const updateBlog = async blog => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(`/api/blogs/${blog._id}`, blog, config);

      dispatch({
        type: UPDATE_BLOG,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: BLOG_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Clear Blogs
  const clearBlogs = () => {
    dispatch({ type: CLEAR_BLOGS });
  };

  // Set Current Blog
  const setCurrent = blog => {
    dispatch({ type: SET_CURRENT, payload: blog });
  };

  // Clear Current Blog
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Filter Blogs
  const filterBlogs = text => {
    dispatch({ type: FILTER_BLOGS, payload: text });
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <BlogContext.Provider
      value={{
        blogs: state.blogs,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addBlog,
        deleteBlog,
        setCurrent,
        clearCurrent,
        updateBlog,
        filterBlogs,
        clearFilter,
        getBlogs,
        clearBlogs
      }}
    >
      {props.children}
    </BlogContext.Provider>
  );
};

export default BlogState;
