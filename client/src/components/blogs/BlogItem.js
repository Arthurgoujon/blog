import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import BlogContext from '../../context/blog/blogContext';

const BlogItem = ({ blog }) => {
  const blogContext = useContext(BlogContext);
  const { deleteBlog, setCurrent, clearCurrent } = blogContext;

  const { _id, title, description, date } = blog;

  const onDelete = () => {
    deleteBlog(_id);
    clearCurrent();
  };

  return (
    <div className='card bg-light projectItem'>
      <h3 className='text-primary text-left'>{title} </h3>

      <p></p>
    </div>
  );
};

BlogItem.propTypes = {
  blog: PropTypes.object.isRequired
};

export default BlogItem;
