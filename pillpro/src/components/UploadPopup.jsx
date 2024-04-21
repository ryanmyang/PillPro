import { Box, IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";

export default function UploadPopup({ icon, handleSubmit, handleCancel, children }) {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        handleCancel();
        setOpen(false);
    };
    const handleUpload = () => {
        handleSubmit();
        setOpen(false);
        // handleClose();
    };

    return (
        <>
            {/* <Button variant="outlined" onClick={handleOpen}>
                Open alert dialog
            </Button> */}
            <IconButton onClick={handleOpen} sx={{ border: "1px dashed black" }}>
                {icon}
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="sm"
                fullWidth
            >
                {/* <DialogTitle id="alert-dialog-title">Upload an image</DialogTitle> */}
                <DialogContent>
                    {/* <DialogContentText id="alert-dialog-description">
                        Let Google help apps determine location. This means sending anonymous
                        location data to Google, even when no apps are running.
                    </DialogContentText> */}
                    {children}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleUpload} autoFocus>
                        Upload
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
