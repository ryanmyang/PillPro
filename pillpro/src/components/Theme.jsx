import { createTheme } from "@mui/material";

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
            default: "#FAF8ED"
        },
        primary: {
            main: "#F3DBDD"
        },
        secondary: {
            main: "#FAF8ED"
        },
        dark: {
            main: "#C8A0CC",
        }
    },
});

export default theme;
