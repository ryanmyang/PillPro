import Box from "@mui/material/Box";
import React, { useEffect, useState} from "react";

import AudioUploader from "../components/AudioUploader";
import Footer from "../components/Footer";
import FileUploader from "../components/ImageUploader";
import MedicationInfo from "../components/MedicationInfo";
import WelcomeBar from "../components/WelcomeBar";

function Home() {
    const [audioTranscript, setAudioTranscript] = useState('');
    const [imageJSON, setImageJSON] = useState({});

    const handleSetAudioTranscript = (data) => {
        setAudioTranscript(data);
        console.log(`Set audio transcript in home page to: \n${data}`)
    };

    const handleSetImageData = (data) => {
        setImageJSON(data);
        console.log(`Set image json in home page: \n${JSON.stringify(data)}`)
    };

    useEffect(() => {
        console.log(audioTranscript)
    }, [audioTranscript]);


    return (
        <Box sx={{textAlign: "center"}}>
            <Box sx={{ backgroundColor: "lightgreen", height: "40%", p: "3rem" }}>
                <WelcomeBar />
            </Box>
            <Box sx={{ backgroundColor: "lightblue", height: "100%", py: "1rem", px: "5rem" }}>
                <AudioUploader setAudio={handleSetAudioTranscript} />
                <FileUploader setImageData={handleSetImageData}/>
                <MedicationInfo />
                <Footer />
            </Box>
        </Box>
    );
}

export default Home;
