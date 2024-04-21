import DownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { Box, IconButton, Typography } from "@mui/material";
import React from "react";

function WelcomeBar() {
    return (
        <>
            <Box
                sx={{ px: "5rem", display: "flex", flexDirection: "column", alignItems: "center" }}
            >
                <Box width={{ xs: "70%", sm: "60%", md: "40%" }}>
                    <Box
                        component="img"
                        src="pillai_logo.png"
                        width="100%"
                        sx={{ pt: "4rem" }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.width = "90%";
                            e.currentTarget.src = "pillai_verify.png";
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.width = "100%";
                            e.currentTarget.src = "pillai_logo.png";
                        }}
                    />
                </Box>
                <Typography
                    variant="subtitle1"
                    sx={{
                        fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem" },
                        color: "#899499",
                        whiteSpace: "pre-wrap",
                    }}
                >
                    Preventing medication prescription errors. {"\n"}
                    Giving you peace of mind with your medications.{"\n"}
                </Typography>
                <Typography
                    variant="subtitle1"
                    sx={{ fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" }, pt: "1rem" }}
                >
                    Verify your medications today!
                </Typography>
            </Box>
            <Box
                sx={{
                    width: "100%",
                    // mt: "1rem",
                    py: "0.5rem",
                    bottom: "1rem",
                    "&:hover": {
                        opacity: 0.5,
                        cursor: "pointer",
                        borderWidth: "3px 0px",
                        borderColor: "black",
                        borderStyle: "solid",
                    },
                }}
                onClick={() =>
                    setTimeout(() => {
                        document.getElementById("main-page").scrollIntoView({ behavior: "smooth" });
                    }, 5)
                }
            >
                <IconButton style={{ backgroundColor: "transparent" }}>
                    <DownIcon />
                </IconButton>
            </Box>
        </>
    );
}

export default WelcomeBar;
