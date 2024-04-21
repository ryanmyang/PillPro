import { Typography } from "@mui/material";

function Footer() {
    return (
        <Typography variant="subtitle2" sx={{ textAlign: "center", whiteSpace: "pre-wrap" }}>
            Made with &#10084; by Sam, Ryan, Wei & Caleb. {"\n"}
            Source code <a href="https://github.com/ryanmyang/PillPro/tree/main">here</a>.
        </Typography>
    );
}

export default Footer;
