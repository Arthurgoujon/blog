import React, { Component } from 'react';
import axios from 'axios';

class Imageform extends Component {
  state = {
    selectedFile: null
  };

  fileSelectedHandler = e => {
    this.setState({
      selectedFile: e.target.files[0]
    });

    console.log(e.target.files[0]);
  };

  fileUploadHandler = e => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('file', this.state.selectedFile); //the bloody form has to be called 'file', as defined in the server route
    fd.append('ref', '1234');
    axios
      .post('API/images/upload', fd, {})
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <input
          type='file'
          id='file'
          name='file'
          onChange={this.fileSelectedHandler}
        />
        <button onClick={this.fileUploadHandler}>Upload</button>
      </div>
    );
  }
}

export default Imageform;
