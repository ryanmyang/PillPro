import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";

import AudioUploader from "../components/AudioUploader";
import Footer from "../components/Footer";
import FileUploader from "../components/ImageUploader";
import LoadingBackdrop from "../components/LoadingOverlay";
import MedicationInfo from "../components/MedicationInfo";
import { Verification } from "../components/Verification";
import WelcomeBar from "../components/WelcomeBar";

const instructionPrompt2 = `Transcript of Doctor Patient.txt is a transcript of an audio recording of my doctor's visit. medications_json.txt is a list of medications I received from the pharmacist. 
Append the JSON object 'Verification Status': {'type': 'string'} to medications_json.txt.

For verification status, verify each of them with the transcript of my doctor's visit and known information about each medication, and display it as one of five options: 1 "Verified" 2 "Not mentioned", if the medication could be for some medical conditions mentioned in the transcript. Include an additional JSON object "Explanation" that explains what this medication could be used for. 3 "Not prescribed and LIKELY AN ERROR", if no corresponding or relevant medical conditions were mentioned in the transcript. Include an additional JSON object "Explanation" that explains why this conclusion was reached 4. "Verbally prescribed but did not receive" if they were correctly prescribed by the doctor for the symptoms discussed, but not received from the pharmacist. Include an additional JSON object "Explanation" that explains the intended usage of the medication. `;


function Home() {
    const [loadingIconVisible, setLoadingIconVisible] = React.useState(false);
    const [audioTranscript, setAudioTranscript] = useState('');
    const [imageJSON, setImageJSON] = useState(null);
    const [verificationInfo, setVerificationInfo] = useState('');

    const handleSetAudioTranscript = (data) => {
        setAudioTranscript(data);
        
    };
    const getVerification = async () => {
        console.log("RUNNING GET VERIFICATION")
        setLoadingIconVisible(true);
        const info = await Verification(instructionPrompt2, imageJSON, audioTranscript);
        setVerificationInfo(info);
    }
    
    const handleSetImageData = (data) => {
        setImageJSON(data);
        
    };
    
    useEffect(() => {
        console.log(`Set audio transcript in home page to: \n${audioTranscript}`)
        if (imageJSON) {
            getVerification();
        }
    }, [audioTranscript]);
    
    useEffect(() => {
        console.log(`Set image json in home page: \n${JSON.stringify(imageJSON)}`)
        if (audioTranscript) {
            getVerification();
        }
    }, [imageJSON]);
    
    useEffect(() => {
        console.log("Verification info updated: \n" + verificationInfo)
        setLoadingIconVisible(false);
    }, [verificationInfo])
    
    return (
        <Box sx={{ textAlign: "center" }}>
            <LoadingBackdrop open={loadingIconVisible} setOpen={setLoadingIconVisible} />
            <Box sx={{ backgroundColor: "primary.main", minHeight: "100vh" }} id="welcome-page">
                <WelcomeBar />
            </Box>
            <Box
                sx={{
                    backgroundColor: "secondary.main",
                    height: "100%",
                    py: "1rem",
                    px: { xs: "5%", sm: "10%" },
                }}
                id="main-page"
            >
                <AudioUploader setAudio={handleSetAudioTranscript} />
                <FileUploader setImageData={handleSetImageData}/>
                <MedicationInfo verificationInfo={verificationInfo}/>
                <Footer />
            </Box>
        </Box>
    );
}

export default Home;
