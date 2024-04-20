import { createTheme } from "@mui/material";
import { deepPurple } from "@mui/material/colors";

const theme = createTheme({
    typography: {
        fontFamily: [`"Open Sans", "Roboto", "Helvetica", "Arial", sans-serif`],
        h1: {
            fontSize: "6rem",
        },
        h2: {
            fontSize: "4rem",
        },
        h3: {
            fontSize: "3rem",
        },
    },
    palette: {
        background: {
            default: deepPurple[50],
        },
        primary: {
            main: deepPurple[500],
        },
        secondary: {
            main: deepPurple[50],
        },
        dark: {
            main: deepPurple[900],
        },
        alt: {
            main: deepPurple["A400"],
        },
    },
});

export default theme;
