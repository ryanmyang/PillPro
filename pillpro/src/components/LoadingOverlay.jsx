import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import * as React from "react";

function LoadingBackdrop({ open }) {
    return (
        <div>
            <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <Typography variant="h5" px="5">
                    Verifying your medications, please hold on...
                </Typography>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}

export default LoadingBackdrop;
