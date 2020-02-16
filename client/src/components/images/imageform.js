import React, { useState, useContext, useEffect } from 'react';
import ImageContext from '../../context/image/imageContext';

const ImageForm = () => {
  const imageContext = useContext(ImageContext);

  const { addImage } = imageContext;

  useEffect(() => {
    if (current !== null) {
      setImage(current);
    } else {
      setImage({
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
    <form action="/upload" method="POST" enctype="multipart/form-data">
    <div class="custom-file mb-3">
      <input type="file" name="file" id="file" class="custom-file-input">
      <label for="file" class="custom-file-label">Choose File</label>
    </div>
    <input type="submit" value="Submit" class="btn btn-primary btn-block">
  </form> 
  );
};

export default ImageForm;
