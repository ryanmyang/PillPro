import { Box, Typography } from "@mui/material";
import React from "react";

function WelcomeBar() {
    return (
        <Box sx={{ backgroundColor: "lightgreen", minHeight: "40vh", textAlign: "center" }}>
            <Typography variant="h1">He.llo</Typography>
            <Typography variant="subtitle1">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae officiis temporibus
                deserunt exercitationem voluptatibus harum dignissimos earum enim laborum?
                Perferendis, eum debitis. Veniam incidunt excepturi officia corporis amet aliquid
                cum?
            </Typography>
        </Box>
    );
}

export default WelcomeBar;
