import { IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
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
                <DialogContent>{children}</DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="dark">Cancel</Button>
                    <Button onClick={handleUpload} color="dark" autoFocus>
                        Upload
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
