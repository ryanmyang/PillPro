import PhotoIcon from "@mui/icons-material/AddPhotoAlternate";
import { Box, List, ListItem, Typography, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import ItemCard from "./ItemCard";
import UploadPopup from "./UploadPopup";
import { readFileAndGetGenerativePart } from "./GeminiFileUpload";
import { fileToJSON } from "./fileToJSON";
import { json } from "react-router-dom";

/**
 * Present an image file visually, which is its name, size and a image preview.
 */
const DisplayImageFiles = ({ files, inPopup }) => {
    // console.log(files);
    return (
        <Grid
            container
            rowSpacing={{ xs: 1, sm: 2 }}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{ my: 1, minHeight: 0, ...(inPopup && { minHeight: "30vh" }) }}
        >
            {files?.map((file) => (
                <Grid key={file.name} item xs={12} sm={6}>
                    <Typography variant="caption">
                        {file.name} ({(file.size / 10 ** 3).toFixed(2)}KB)
                    </Typography>
                    <Box
                        component="img"
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        sx={{ width: "100%" }}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

function ImageUploader( { setImageData }) {
    const [files, setFiles] = useState(null);
    const { acceptedFiles, fileRejections, getRootProps, getInputProps } = useDropzone({
        accept: {
            "image/jpg": [".jpg", ".jpeg"],
            "image/png": [".png"],
        },
    });

    const handleCancel = () => {
        acceptedFiles.splice(0, acceptedFiles.length);
        fileRejections.splice(0, fileRejections.length);
    };

    const handleSubmit = () => {
        setFiles(acceptedFiles.map((f) => new File([f], f.name, { type: f.type })));
    };
    useEffect(() => handleCancel(), [files]);

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
            setImageData(flattened);
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

            <UploadPopup
                icon={<PhotoIcon />}
                handleSubmit={handleSubmit}
                handleCancel={handleCancel}
            >
                <Typography variant="h4">Upload your prescriptions</Typography>
                <Box
                    {...getRootProps()}
                    sx={{ border: "1px dashed grey", my: "1rem", px: "1rem", overflowY: "auto" }}
                >
                    <input {...getInputProps()} />
                    <p>Drag and drop some files here, or click to select files.</p>
                    <em>(Only *.jpg and *.png images are accepted)</em>
                    <aside>
                        {/* <List>{acceptedFileItems}</List> */}
                        <DisplayImageFiles files={acceptedFiles} inPopup={true} />
                        {fileRejections.length > 0 && (
                            <Typography variant="caption">
                                Some or all files are not valid image filetypes. Please ensure all
                                files are images.
                            </Typography>
                        )}
                    </aside>
                </Box>
            </UploadPopup>

            <DisplayImageFiles files={files} inPopup={false} />
            {/* {files && files.map((file) => <Typography>{file.path}</Typography>)} */}
            {/* {console.log(files)} */}
        </ItemCard>
    );
}

export default ImageUploader;
