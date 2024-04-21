import { Box, Typography } from "@mui/material";
import React from "react";

function WelcomeBar() {
    return (
        <Box sx={{ px: "5rem" }}>
            <Typography variant="h1">Hello</Typography>
            <Typography variant="subtitle1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, ducimus placeat! Ex, aspernatur, modi alias nisi distinctio eum rem rerum provident, perferendis quaerat in explicabo? Maiores accusantium deleniti dignissimos delectus.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto facere vero non asperiores, cupiditate sint maxime optio. Quaerat, provident facere pariatur, explicabo aspernatur deleniti dolorum quos vitae temporibus voluptas voluptatum.
            </Typography>
        </Box>
    );
}

export default WelcomeBar;
