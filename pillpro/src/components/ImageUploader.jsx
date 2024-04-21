import PhotoIcon from "@mui/icons-material/AddPhotoAlternate";
import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import ItemCard from "./ItemCard";
import UploadPopup from "./UploadPopup";

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

function ImageUploader() {
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
