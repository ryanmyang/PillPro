import React, { useEffect, useState } from 'react';
import { audioToTranscript } from './audioToTranscript';


function AudioUpload() {
  const [file, setFile] = useState(null); // State to store the selected file
  const [filePart, setFilePart] = useState(null);

  // Handles file selection
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) {
      alert('No file selected.');
      setFile(null);
      return;
    }

    setFile(selectedFile)
    

  };

  useEffect(() => {
    if (file) {
      console.log("file found")
      const reader = new FileReader();
      reader.onload = function(evt) {
          const base64Data = evt.target.result.toString("base64").split(',')[1]; // Remove the base64 header
          console.log(base64Data);
          const mimeType = 'audio/m4a';
          const generativePart = {
              inlineData: {
                  data: base64Data ? base64Data: 'BAD',
                  mimeType
              }
          };
          setFilePart(generativePart);
      };
      reader.readAsDataURL(file);
  }
  
  }, [file]);

  async function processFilePart() {
    if (filePart) {
      console.log(`File part found, ${JSON.stringify(filePart)}`);
      console.log(filePart.data);
      const result = await audioToTranscript(filePart);
      console.log(result)
    }
  }
  useEffect(() => {
    processFilePart();
  }, [filePart]);



  return (
    <div>
      <p>audio</p>
      <input type="file" onChange={handleFileChange} />
      {file && <p>File ready to be processed: {file.name}</p>}
    </div>
  );
}

export default AudioUpload;
