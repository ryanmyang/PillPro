import React, { useState } from 'react';
import FileUploader from '../components/FileUploader';
import { generateMedicineJSON } from '../components/textToJSON';


const example_text = `
Analysis of Medication Label
Based on the image provided, here's an analysis of the medication label:
Medication Name: ZITHROMAX
Dosage Form: Tablets, film-coated
Strength: 250mg
Quantity: 6 tablets (1 box)
Instructions: Take 1 tablet twice a day
Additional Information:

Patient: JOE BRUIN
Date: 13/12/2022
Handwritten note: "Anti-biotic"
Important Considerations:
This information is not a substitute for professional medical advice. Always consult with a healthcare professional for guidance on medications.
Do not take Zithromax without a prescription.
The handwritten note indicates the medication is an antibiotic. It's crucial to complete the full course as prescribed, even if symptoms improve, to prevent antibiotic resistance.
Be aware of potential side effects and drug interactions.
Consult your doctor or pharmacist if you have any questions or concerns 
`

const handleFile = (file) => {
    console.log('Selected file:', file.name);
  };

function Test() {
    const [medicineInfo, setMedicineInfo] = useState('');

  // Event handler to call the generateMedicineJSON function
  const handleGenerateMedicineInfo = async () => {
    const info = await generateMedicineJSON(example_text);
    setMedicineInfo(info);
  };


  return (
  <div>
    <FileUploader onFileSelect={handleFile}/>
    <h1>Test {process.env.REACT_APP_GEMINI_API_KEY}</h1>
    <button onClick={handleGenerateMedicineInfo}>Generate Medicine Info</button>
      {medicineInfo && <div><p>Generated Medicine Info:</p><pre>{medicineInfo}</pre></div>}
    </div>
);
}

export default Test;
