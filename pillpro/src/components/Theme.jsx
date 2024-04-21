import { createTheme } from "@mui/material";
import { deepPurple, lightBlue } from "@mui/material/colors";

const theme = createTheme({
    typography: {
        fontFamily: [`"Open Sans", "Roboto", "Helvetica", "Arial", sans-serif`],
        h1: {
            fontSize: "7rem",
        },
        h2: {
            fontSize: "2.5rem",
        },
        h3: {
            fontSize: "2rem",
        },
    },
    palette: {
        background: {
            default: lightBlue[50],
        },
        primary: {
            main: lightBlue[500],
        },
        secondary: {
            main: lightBlue[50],
        },
        dark: {
            main: lightBlue[900],
        },
        alt: {
            main: lightBlue["A400"],
        },
    },
});

export default theme;
