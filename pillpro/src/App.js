import { ThemeProvider, createTheme } from "@mui/material";
import React from "react";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import theme from "./components/Theme";
import logo from "./logo.svg";
import Home from "./pages/Home";
import Test from "./pages/Test";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <div>
                    {/* Nav bar hidden*/}
                    {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/test">Test</Link>
            </li>
          </ul>
        </nav> */}

                    {/* A <Routes> component that checks its children <Route> components
            and renders the one that matches the current URL. */}
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/test" element={<Test />} />
                    </Routes>
                </div>
            </Router>
        </ThemeProvider>
    );
}

export default App;
