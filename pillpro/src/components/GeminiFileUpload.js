import React, { useEffect, useState } from 'react';
import { fileToTranscript } from './fileToTranscript';


function readFileAndGetGenerativePart(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject("No file provided");
      return;
    }
    console.log("reading file, making generative part");
    const reader = new FileReader();

    reader.onload = function (evt) {
      const base64Data = evt.target.result.toString("base64").split(',')[1]; // Remove the base64 header
      const mimeType = file.type;
      const generativePart = {
        inlineData: {
          data: base64Data,
          mimeType
        }
      };
      resolve(generativePart);
    };

    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
}

function GeminiFileUpload ({ prompt }) {
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
    console.log(selectedFile);

    setFile(selectedFile)
    

  };

  

  useEffect(() => {
    if (file) {
      readFileAndGetGenerativePart(file).then(setFilePart).catch(error => {
        console.error("Error reading file:", error);
      });
    }
  }, [file]);

  async function processFilePart() {
    if (filePart) {
      console.log(`File part found, ${JSON.stringify(filePart)}`);
      console.log(filePart.data);
      const result = await fileToTranscript(prompt, filePart);
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

export default GeminiFileUpload;
export { readFileAndGetGenerativePart };
