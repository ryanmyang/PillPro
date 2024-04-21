import AudioIcon from "@mui/icons-material/KeyboardVoice";
import { Box, List, ListItem, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import ItemCard from "./ItemCard";
import UploadPopup from "./UploadPopup";

function AudioUploader() {
    const [files, setFiles] = useState(null);
    const { acceptedFiles, fileRejections, getRootProps, getInputProps } = useDropzone({
        maxFiles: 1,
        accept: {
            "audio/mpeg": [".mp3"],
            "audio/wav": [".wav"],
            "audio/webm": [".webm"],
            "audio/flac": [".flac"],
            "audio/x-m4a": [".m4a"],
        },
    });

    const acceptedFileItems = acceptedFiles.map((file) => (
        <ListItem key={file.path}>
            <Typography>
                {file.path} - {file.size} bytes
            </Typography>
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
            <Typography variant="h2">Upload your consultation</Typography>
            <Typography paragraph>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum saepe quis sit,
                dolorem at minus molestiae quidem corporis asperiores modi quibusdam facere
                excepturi ullam voluptas nobis qui. Dolorem, in molestias.
            </Typography>

            <UploadPopup icon={<AudioIcon />} handleSubmit={handleSubmit} handleReset={handleReset}>
                <Box {...getRootProps({ className: "dropzone" })}>
                    <Typography variant="h4">Upload your consultation</Typography>
                    <input {...getInputProps()} />
                    <p>Drag and drop an audio file here, or click to select a file</p>
                    <em>(Only valid audio filetypes (mp3, m4a, wav) files are accepted)</em>
                    <aside>
                        {/* {console.log(acceptedFiles)} */}
                        <List>{acceptedFileItems}</List>
                        {fileRejections.length > 0 && (
                            <Typography variant="caption">Filetype is not supported</Typography>
                        )}
                    </aside>
                </Box>
            </UploadPopup>
            {files && files.map((file) => <Typography>{file.path}</Typography>)}
            {console.log(files)}
        </ItemCard>
    );
}

export default AudioUploader;
