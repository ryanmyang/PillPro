import AudioIcon from "@mui/icons-material/KeyboardVoice";
import { Box, List, ListItem, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import ItemCard from "./ItemCard";
import UploadPopup from "./UploadPopup";

/**
 * Present an audio file visually, which is simply its name and size.
 */
const DisplayAudioFiles = ({ files }) => {
    // console.log(files);
    return (
        <List>
            {files?.map((file) => (
                <ListItem key={file.name}>
                    <Typography>
                        {file.name} ({(file.size / 10 ** 6).toFixed(2)}MB)
                    </Typography>
                </ListItem>
            ))}
        </List>
    );
};

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
            <Typography variant="h2">Upload your consultation</Typography>
            <Typography paragraph sx={{ whiteSpace: "pre-wrap" }}>
                Afraid you'll forget something from your consultation? Record your consultation and
                upload it here!
            </Typography>

            <UploadPopup
                icon={<AudioIcon />}
                handleSubmit={handleSubmit}
                handleCancel={handleCancel}
            >
                <Typography variant="h4">Upload your consultation</Typography>
                <Box {...getRootProps()} sx={{ border: "1px dashed grey", my: "1rem", px: "1rem" }}>
                    <input {...getInputProps()} />
                    <p>Drag and drop an audio file here, or click to select a file</p>
                    <em>(Only valid audio filetypes (mp3, m4a, wav) files are accepted)</em>
                    <aside>
                        <DisplayAudioFiles files={acceptedFiles} />
                        {fileRejections.length > 0 && (
                            <Typography variant="caption">
                                Filetype is not supported or more than one audio file uploaded.
                                Please ensure only one audio file is uploaded.
                            </Typography>
                        )}
                    </aside>
                </Box>
            </UploadPopup>
            <DisplayAudioFiles files={files} />
        </ItemCard>
    );
}

export default AudioUploader;
