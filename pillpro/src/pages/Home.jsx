import { Box, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import React from "react";
import FileUploader from "../components/ImageUploader";
import ItemCard from "../components/ItemCard";
import WelcomeBar from "../components/WelcomeBar";

function Home() {
    return (
        <Box sx={{ backgroundColor: "lightblue", height: "100%", minHeight: "100vh", p: "3rem" }}>
            <WelcomeBar />
            <FileUploader />

            {/* <ItemCard>
				<Box>
					Hello
					<Button type="submit">S</Button>
				</Box>
			</ItemCard> */}
        </Box>
    );
    // return <h1>Welcome to the Home Page</h1>;
}

export default Home;
