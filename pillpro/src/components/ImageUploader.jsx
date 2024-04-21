import PhotoIcon from "@mui/icons-material/AddPhotoAlternate";
import { Box, List, ListItem, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import ItemCard from "./ItemCard";
import UploadPopup from "./UploadPopup";
import { readFileAndGetGenerativePart } from "./GeminiFileUpload";
import { fileToJSON } from "./fileToJSON";
import { json } from "react-router-dom";

function ImageUploader( { setImageData }) {
    const [files, setFiles] = useState(null);
    const { acceptedFiles, fileRejections, getRootProps, getInputProps } = useDropzone({
        accept: {
            "image/jpg": [".jpg", ".jpeg"],
            "image/png": [".png"],
        },
    });

    const acceptedFileItems = acceptedFiles.map((file) => (
        <ListItem key={file.path}>
            <Typography>
                {file.path} - {file.size} bytes
            </Typography>
            <Box
                component="img"
                src={URL.createObjectURL(file)}
                alt={file.path}
                sx={{ width: "50%" }}
            />
        </ListItem>
    ));

    const handleReset = () => {
        setFiles(null);
        acceptedFiles.splice(0, acceptedFiles.length);
        fileRejections.splice(0, fileRejections.length);
        acceptedFileItems.splice(0, acceptedFileItems.length);
    };

    const handleSubmit = () => {
        setFiles(acceptedFiles);
    };

    useEffect(() => {
        if (!files) {
            return;
        }
        const imageToJSONPrompt = "These images were the medications I received from the pharmacist. List all medications I received from the pharmacist using the following JSON schema: [{'type': 'object','properties': {'Name': {'type': 'string'}, 'Full description': {'type': 'string'},''WeeklyFrequency': {'type': 'integer'},'DayFrequency': {'type': 'integer'},'FrequencyDescription': {'type': 'string'},'SideEffects': {'type': 'string'}]";
        
        let promises = files.map(file => readFileAndGetGenerativePart(file));

        Promise.all(promises).then((fileParts) => {
            console.log(fileParts); // Debug: check the structure of fileParts
            console.log("transcribing...");

            // Handle potentially asynchronous fileToJSON
            return Promise.all(fileParts.map(filePart => {
                return fileToJSON(imageToJSONPrompt, filePart).then(medicineObject => {
                    console.log(JSON.stringify(filePart)); // Debug: check file part
                    return medicineObject;
                });
            }));
        })
        .then(medicineObjects => {
            const cleanedObjects = medicineObjects.map(jsonString => parseJSONString(jsonString)); 
            const flattened = cleanedObjects.flat()
            console.log("Set image objects to " + JSON.stringify(flattened));
            setImageData(cleanedObjects);
        })
        .catch((error) => {
            console.error('Error processing files:', error);
        });
    }, [files]);

    function parseJSONString(jsonString) {
        console.log(`Parsing JSON string ${jsonString}`)
        jsonString = jsonString.replace(/.*?```json/gs, '').trim();
        jsonString = jsonString.replace(/```.*$/gs, '').trim();
        // Parse the JSON string into an actual JavaScript object
        let jsonArray;
        try {
            jsonArray = JSON.parse(jsonString);
            console.log("Parsed JSON Array:", jsonArray);
            return jsonArray;
        } catch (error) {
            console.error("Failed to parse JSON:", error);
        }
    }

    return (
        <ItemCard>
            <Typography variant="h2">Upload your prescriptions</Typography>
            <Typography paragraph>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta sequi consequatur
                fuga? Libero odit quaerat necessitatibus, ex natus nisi beatae ad magni tempora nam
                earum sapiente! Nobis dicta recusandae nulla!
            </Typography>

            <UploadPopup icon={<PhotoIcon />} handleSubmit={handleSubmit} handleReset={handleReset}>
                <Box {...getRootProps({ className: "dropzone" })}>
                    <Typography variant="h4">Upload your prescriptions</Typography>
                    <input {...getInputProps()} />
                    <p>Drag and drop some files here, or click to select files</p>
                    <em>(Only *.jpg and *.png images are accepted)</em>
                    <aside>
                        {/* {console.log(acceptedFiles)} */}
                        <h4>Accepted files</h4>
                        <List>{acceptedFileItems}</List>
                        {fileRejections.length > 0 && (
                            <Typography variant="caption">Only images are supported</Typography>
                        )}
                        {/* <h4>Rejected files</h4>
                <List>{rejectedFileItems}</List> */}
                    </aside>
                </Box>
            </UploadPopup>
            {files && files.map((file) => <Typography>{file.path}</Typography>)}
            {console.log(files)}
        </ItemCard>
    );
}

export default ImageUploader;
