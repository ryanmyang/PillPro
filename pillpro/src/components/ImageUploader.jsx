import PhotoIcon from "@mui/icons-material/AddPhotoAlternate";
import { Box, List, ListItem, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import ItemCard from "./ItemCard";
import UploadPopup from "./UploadPopup";

function ImageUploader() {
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
