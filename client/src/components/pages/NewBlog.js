import React from 'react';
import NewBlog from '../blogs/NewBlog';
import ImageForm, { imageform } from '../images/imageform';

const Home = () => {
  return (
    <div className='grid-2'>
      <div>
        <NewBlog />
        <ImageForm />
      </div>
    </div>
  );
};

export default Home;
