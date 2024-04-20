import React from 'react';
import ImageUploader from '../components/ImageUploader';

const handleFile = (file) => {
    console.log('Selected file:', file.name);
  };

function Test() {
  return (
  <div>
    <ImageUploader onFileSelect={handleFile}/>
    <h1>Test {process.env.REACT_APP_GEMINI_API_KEY}</h1>
    </div>
);
}

export default Test;
