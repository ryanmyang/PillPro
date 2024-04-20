import React from 'react';
import FileUploader from '../components/FileUploader';

const handleFile = (file) => {
    console.log('Selected file:', file.name);
  };

function Test() {
  return (
  <div>
    <FileUploader onFileSelect={handleFile}/>
    <h1>Test</h1>
    </div>);
}

export default Test;
