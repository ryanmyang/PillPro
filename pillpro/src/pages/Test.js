import React, { useState } from 'react';
import FileUploader from '../components/FileUploader';
import { getGeminiResponse } from '../components/GetGeminiResponse';
import { getGeminiResponseJSON } from '../components/GetGeminiResponseJSON';
import GeminiFileUpload from '../components/GeminiFileUpload';
import { Verification } from '../components/Verification';


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

const inputJSON = `[
  {
    "Name": "ZITHROMAX",
    "Full description": "ZITHROMAX TAB 250MG",
    "WeeklyFrequency": 14,
    "DayFrequency": 2,
    "FrequencyDescription": "Take 1 tablet 2 times a day",
    "SideEffects": "Common side effects of Zithromax can include nausea, vomiting, diarrhea, abdominal pain, and headache. More serious side effects can occur, so it is important to talk to your doctor about the risks and benefits of taking Zithromax before starting treatment."
  },
  {
    "Name": "DHASEDYL SYRUP",
    "Full description": "DHASEDYL SYRUP - 60ML SALBUTAMOL SYRUP 2MG/5ML",
    "WeeklyFrequency": 21,
    "DayFrequency": 3,
    "FrequencyDescription": "Take 10ml 3 times a day",
    "SideEffects": "Common side effects of Dhasedyl Syrup and Salbutamol Syrup can include tremors, headache, dizziness, and nausea. More serious side effects can occur, so it is important to talk to your doctor about the risks and benefits of taking these medications before starting treatment."
  },
  {
    "Name": "TELFAST D",
    "Full description": "TELFAST D - 10 tabs",
    "WeeklyFrequency": 14,
    "DayFrequency": 2,
    "FrequencyDescription": "Take 1 tablet 2 times a day FOR BLOCKED NOSE/RUNNING NOSE",
    "SideEffects": "Common side effects of Telfast D can include headache, drowsiness, and dry mouth. More serious side effects can occur, so it is important to talk to your doctor about the risks and benefits of taking Telfast D before starting treatment."
  }
]`;

const inputTranscript = `Transcript of Doctor-Patient Interaction Regarding Allergy and Sinus Symptoms
Patient: (Sounds unwell) Um, not too great to be honest. I'm having an awful runny nose, sneezing, and my eyes are all watery. Um, it's just really bad.
Doctor: I'm sorry to hear that. How long have you been experiencing these symptoms?
Patient: Uh, about a week now, but it's getting worse. Uh, I'm losing sleep because of it as well.
Doctor: Hmm, sounds like you might be dealing with seasonal allergies. Have you noticed if anything in particular triggers these symptoms?
Patient: Um, yeah, it tends to get worse outside, outdoors, maybe near like trees or like grass in general.
Doctor: I see. That's a classic sign of allergic rhinitis. I'm going to prescribe you Telfast D to help alleviate those symptoms. It's an antihistamine that should provide some relief.
Patient: Oh, uh, okay, sure. Um, but I also have like a cough, a nagging cough, that's like tightness in my chest as well.
Doctor: Have you had any difficulty breathing along with the cough?
Patient: Yeah, a little bit. Uh, when I'm doing like exercise, physical activity, or when there's dust or strong smells.
Doctor: It sounds like you might also have some bronchospasm, possibly due to your allergies aggravating your airways. I'm going to prescribe you Salbutamol syrup to help relieve that tightness and make breathing easier.
Patient: Okay, um, yeah sure, uh, and one more thing, I've been really tired lately, uh, and a very bad headache.
Doctor: Fatigue and headaches, huh? Have you been experiencing any nasal congestion or sinus pressure?
Patient: Uh, now that you mention it, yeah. Uh, my nose sometimes feels a little stuffy, my head feels a little heavy. Yeah.
Doctor: It sounds like you might have developed a sinus infection on top of your allergies. I'll prescribe you Zithromax to help clear up that infection.
Patient: Okay, sounds good. Okay. Um, sorry doctor, just one more thing. Uh, I have trouble sleeping as well because of all these symptoms and I just feel very restless at night.
Doctor: Yeah, I understand that. Since your symptoms are interfering with your sleep, I'll also prescribe you Dhasedyl syrup. It's a mild sedative that should help you relax and get some rest.
Patient: All right, thank you so much doctor. Yeah.
Doctor: Of course, happy to help. I'll have them prepare Dhasedyl and Salbutamol as a mixture syrup together. Just make sure to take these medications as directed. And if you have any concerns or symptoms worsen, don't hesitate to give us a call.
Patient: All right, thank you doctor.
Doctor: Okay, bye.`;



const instructionPrompt = `use the included prescription description to list all medicines using the following json schema: {'type': 'object','properties': {'medication': {'type': 'string'},'weeklyfrequency': {'type': 'integer'},'dayfrequency': {'type': 'integer'},'frequencydescription': {'type': 'string'},'sideeffects': {'type': 'string'}}}`

const filePrompt = "Evaluate the attached file in detail and produce a transcript of the content."

const instructionPrompt2 = `Transcript of Doctor Patient.txt is a transcript of an audio recording of my doctor’s visit. medications_json.txt is a list of medications I received from the pharmacist. 
Append the JSON object 'Verification Status': {'type': 'string'} to medications_json.txt.

For verification status, verify each of them with the transcript of my doctor’s visit and known information about each medication, and display it as one of five options: 
1. "Verified"
2. "Medication not found", if the medication could be for some medical conditions mentioned in the transcript. Include an additional JSON object “Explanation” that explains what this medication could be used for. 
3. "Medication not found AND MIGHT BE AN ERROR", if no corresponding or relevant medical conditions were mentioned in the transcript. Include an additional JSON object “Explanation” that explains why this conclusion was reached. 
4. “Prescribed but not dispensed” if they were correctly prescribed by the doctor for the symptoms discussed, but not received from the pharmacist. Include an additional JSON object “Explanation” that explains the intended usage of the medication.`;



function Test() {
    const [medicineInfo, setMedicineInfo] = useState('');
    const [verificationInfo, setVerificationInfo] = useState('');

    const getMedicineJSON = async () => {
        const info = await getGeminiResponseJSON(instructionPrompt, example_text);
        setMedicineInfo(info);
    }
    
    const getVerification = async () => {
      const info = await Verification(instructionPrompt2, inputJSON, inputTranscript);
      setVerificationInfo(info);
    }

    const handleFile = (file) => {
        console.log('Selected file:', file.name);
      };

  return (
  <div>
    <FileUploader onFileSelect={handleFile}/>
    <h1>Test</h1>
    <button onClick={getMedicineJSON}>test generate medicine</button>
    <button onClick={getVerification}>Verify!</button>

    <GeminiFileUpload prompt={filePrompt}/>
    <GeminiFileUpload prompt={filePrompt}/>
    {verificationInfo && <div><p>Verification:</p><pre>{verificationInfo}</pre></div>}
    {medicineInfo && <div><p>Generated Medicine Info:</p><pre>{medicineInfo}</pre></div>}
    </div>
);
}

export default Test;
