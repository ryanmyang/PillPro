import Box from "@mui/material/Box";
import React from "react";

import AudioUploader from "../components/AudioUploader";
import Footer from "../components/Footer";
import FileUploader from "../components/ImageUploader";
import MedicationInfo from "../components/MedicationInfo";
import WelcomeBar from "../components/WelcomeBar";

function Home() {
    return (
        <Box sx={{ textAlign: "center" }}>
            <Box sx={{ backgroundColor: "lightgreen", minHeight: "100vh" }} id="welcome-page">
                <WelcomeBar />
            </Box>
            <Box
                sx={{
                    backgroundColor: "lightblue",
                    height: "100%",
                    py: "1rem",
                    px: { xs: "5%", sm: "10%" },
                }}
                id="main-page"
            >
                <AudioUploader />
                <FileUploader />
                <MedicationInfo />
                <Footer />
            </Box>
        </Box>
    );
}

export default Home;
