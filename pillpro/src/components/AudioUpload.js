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
          const base64Data = evt.target.result.toString("base64"); // Remove the base64 header
          const mimeType = file.type;
          const generativePart = {
              inlineData: {
                  data: base64Data.split(':')[1],
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
      console.log(`File part found, ${JSON.stringify(filePart)}`)
      const result = await audioToTranscript(filePart);
      console.log(result.text())
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
