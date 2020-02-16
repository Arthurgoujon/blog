import React, { useState, useContext, useEffect } from 'react';
import BlogContext from '../../context/blog/blogContext';

const BlogForm = () => {
  const blogContext = useContext(BlogContext);

  const { addBlog, updateBlog, clearCurrent, current } = blogContext;

  useEffect(() => {
    if (current !== null) {
      setBlog(current);
    } else {
      setBlog({
        title: '',
        description: ''
      });
    }
  }, [blogContext, current]);

  const [blog, setBlog] = useState({
    title: '',
    description: ''
  });

  const { title, description } = blog;

  const onChange = e => setBlog({ ...blog, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      addBlog(blog);
    } else {
      updateBlog(blog);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {current ? 'Edit project' : 'Add project'}
      </h2>
      <input
        type='text'
        placeholder='title'
        name='title'
        value={title}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='description'
        name='description'
        value={description}
        onChange={onChange}
      />
      <div>
        <input
          type='submit'
          value={current ? 'Update Contact' : 'Add project'}
          className='btn btn-primary btn-block'
        />
      </div>

      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default BlogForm;
