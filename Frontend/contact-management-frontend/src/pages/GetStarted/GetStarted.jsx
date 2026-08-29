import React from "react";
import { useNavigate } from "react-router-dom";
import "./GetStarted.css";

function GetStarted() {

    const navigate = useNavigate();

    return (
        <div className="get-started-page">

            <div className="get-started-card">

                <h1>Welcome to Contact Management</h1>

                <p>
                    Choose an option below to get started with
                    your contact management journey.
                </p>

                <button
                    onClick={() => navigate("/signup")}
                >
                    Create an Account
                </button>

                <button
                    onClick={() => navigate("/signin")}
                >
                    Already Registered? Sign In
                </button>

                <button
                    className="google-button"
                    onClick={() =>
                        window.location.href =
                        "http://localhost:8080/oauth2/authorization/google"
                    }
                >
                    Continue with Google
                </button>

                <button
                    className="back-button"
                    onClick={() => navigate("/")}
                >
                    ← Back to Home
                </button>

            </div>

        </div>
    );
}

export default GetStarted;