import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import BlogItem from './BlogItem';
import Spinner from '../layout/Spinner';
import BlogContext from '../../context/blog/blogContext';

const AllBlogs = () => {
  const blogContext = useContext(BlogContext);

  const { blogs, filtered, getBlogs, loading } = blogContext;

  useEffect(() => {
    getBlogs();
    // eslint-disable-next-line
  }, []);

  if (blogs !== null && blogs.length === 0 && !loading) {
    return <h4>Please add a blog</h4>;
  }

  return (
    <div>
      <div>
        {blogs !== null && !loading ? (
          <div className='projectWrapper'>
            {filtered !== null
              ? filtered.map(blog => <BlogItem blog={blog} key={blog._id} />)
              : blogs.map(blog => <BlogItem blog={blog} key={blog._id} />)}
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default AllBlogs;
