import { Box, Button, List, ListItem, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import ItemCard from "./ItemCard";

function FileDropzone(props) {
    const { acceptedFiles, fileRejections, getRootProps, getInputProps } = useDropzone({
        accept: {
            "image/jpg": [".jpg", ".jpeg"],
            "image/png": [".png"],
        },
    });

    const acceptedFileItems = acceptedFiles.map((file) => {
        // console.log(file);
        return (
            <ListItem key={file.path}>
                <Typography>
                    {file.path} - {file.size} bytes
                </Typography>
                {console.log(URL.createObjectURL(file))}
                <Box
                    component="img"
                    src={URL.createObjectURL(file)}
                    alt={file.path}
                    sx={{ width: "50%" }}
                />
            </ListItem>
        );
    });

    const fileRejectionItems = fileRejections.map(({ file, errors }) => (
        <ListItem key={file.path}>
            {file.path} - {file.size} bytes
            <ul>
                {errors.map((e) => (
                    <ListItem key={e.code}>{e.message}</ListItem>
                ))}
            </ul>
        </ListItem>
    ));

    return (
        <Box {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <p>Drag and drop some files here, or click to select files</p>
            <em>(Only *.jpeg and *.png images will be accepted)</em>
            <aside>
                <h4>Accepted files</h4>
                {console.log(acceptedFiles)}
                <List>{acceptedFileItems}</List>
                <h4>Rejected files</h4>
                <List>{fileRejectionItems}</List>
            </aside>
        </Box>
    );
}

function FileUploader() {
    const [file, setFile] = useState(null); // State to store the selected file
    const [open, setOpen] = useState(false);

    const onFileSelect = (file) => {
        console.log(file.name);
    };

    // Handles file selection
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);

            if (onFileSelect) {
                onFileSelect(selectedFile);
            }
        } else {
            alert("No file selected.");
            setFile(null);
        }
    };

    return (
        <ItemCard>
            <Typography variant="h2">Upload file</Typography>
            <Typography paragraph>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta sequi consequatur
                fuga? Libero odit quaerat necessitatibus, ex natus nisi beatae ad magni tempora nam
                earum sapiente! Nobis dicta recusandae nulla!
            </Typography>
            {/* <Box>
                <Button variant="contained" component="label">
                    <input type="file" onChange={handleFileChange} />
                </Button>
                {file && <p>File ready to be processed: {file.name}</p>}
            </Box> */}
            {/* <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
                Add Image
            </Button> */}
            <FileDropzone />
        </ItemCard>
    );
}

export default FileUploader;
