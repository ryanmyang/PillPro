import React, { useState } from 'react';

function FileUploader({ onFileSelect }) {
  const [file, setFile] = useState(null); // State to store the selected file

  // Handles file selection
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);

        if (onFileSelect) {
        onFileSelect(selectedFile);
        } 
    } else {
      alert('No file selected.');
      setFile(null);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {file && <p>File ready to be processed: {file.name}</p>}
    </div>
  );
}

export default FileUploader;
