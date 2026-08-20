import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import GetStarted from "./pages/GetStarted/GetStarted";
import Signup from "./pages/Signup/Signup";
import Signin from "./pages/Signin/Signin";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/get-started"
                    element={<GetStarted />}
                />

                <Route
                    path="/signup"
                    element={<Signup />}
                />

                <Route
                    path="/signin"
                    element={<Signin />}
                />

            </Routes>

        </BrowserRouter>
    </React.StrictMode>
);