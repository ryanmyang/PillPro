import React, { useState } from 'react';
import FileUploader from '../components/FileUploader';
import { generateMedicineJSON, getGeminiResponse } from '../components/GetGeminiResponse';
import GeminiFileUpload from '../components/GeminiFileUpload';


const example_text = `
## transcript of medication box

the image shows a medication box with the following information: 

* **number of tablets:** 6 film-coated tablets
* **medical clinic:** my health partners medical clinic 
* **clinic address:** 25d lorong liput singapore 277735
* **clinic phone number:** tel: 64590418
* **medication name:** zithromax tab 250mg
* **quantity:** 1 box 
* **dosage instructions:** take 1 tablet/ 2 times a day
* **type of medication:** anti-biotic
* **patient id:** 18905 liow jia le caleb
* **date:** 13/12/2022 
`

const instructionPrompt = `use the included prescription description to list all medicines using the following json schema: {'type': 'object','properties': {'medication': {'type': 'string'},'weeklyfrequency': {'type': 'integer'},'dayfrequency': {'type': 'integer'},'frequencydescription': {'type': 'string'},'sideeffects': {'type': 'string'}}}`

const filePrompt = "Evaluate the attached file in detail and produce a transcript of the content."




function Test() {
    const [medicineInfo, setMedicineInfo] = useState('');

    const getMedicineJSON = async () => {
        const info = await getGeminiResponseJSON(instructionPrompt, example_text);
        setMedicineInfo(info);
    }

    const handleFile = (file) => {
        console.log('Selected file:', file.name);
      };

  return (
  <div>
    <FileUploader onFileSelect={handleFile}/>
    <h1>Test</h1>
    <button onClick={getMedicineJSON}>test generate medicine</button>
    <GeminiFileUpload prompt={filePrompt}/>
      {medicineInfo && <div><p>Generated Medicine Info:</p><pre>{medicineInfo}</pre></div>}
    </div>
);
}

export default Test;
