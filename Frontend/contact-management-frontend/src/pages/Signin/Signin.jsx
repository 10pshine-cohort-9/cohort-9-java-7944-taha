
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signin.css";

function Signin() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");


    const handleChange = (event) => {

        const {
            name,
            value
        } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });

    };


    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");

        /*
         * At least one of Username or Email
         * should be provided.
         */
        if (
            !formData.userName.trim() &&
            !formData.email.trim()
        ) {

            setError(
                "Please enter your username or email."
            );

            return;

        }


        setLoading(true);


        try {

            const response =
                await fetch(
                    "http://localhost:8080/public/login",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(
                                formData
                            )
                    }
                );


            if (!response.ok) {

                throw new Error(
                    "Invalid username/email or password"
                );

            }


            const token =
                await response.text();


            /*
             * Remove any previous admin session
             */
            localStorage.removeItem(
                "adminToken"
            );


            /*
             * Store normal user JWT
             */
            localStorage.setItem(
                "token",
                token
            );


            alert(
                "Login successful!"
            );


            navigate(
                "/dashboard"
            );

        } catch (error) {

            console.error(
                "Login error:",
                error
            );


            setError(
                error.message ||
                "Unable to connect to server."
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="signin-page">

            <div className="signin-wrapper">


                {/* LEFT SECTION */}

                <div className="signin-info">

                    <div className="signin-logo">

                        Contact<span>Manager</span>

                    </div>


                    <h1>

                        Welcome

                        <br />

                        <span>
                            Back.
                        </span>

                    </h1>


                    <p>

                        Sign in to access your contacts and
                        continue managing them securely.

                    </p>


                    <div className="signin-benefits">


                        <div className="benefit">

                            <span>
                                ✓
                            </span>

                            <p>
                                Secure JWT authentication
                            </p>

                        </div>


                        <div className="benefit">

                            <span>
                                ✓
                            </span>

                            <p>
                                Access your contacts
                            </p>

                        </div>


                        <div className="benefit">

                            <span>
                                ✓
                            </span>

                            <p>
                                Keep everything organized
                            </p>

                        </div>

                    </div>

                </div>


                {/* SIGN IN CARD */}

                <div className="signin-card">


                    {/* HEADER */}

                    <div className="signin-card-header">

                        <div>

                            <h2>
                                Sign In
                            </h2>

                            <p className="signin-subtitle">

                                Enter your credentials to continue

                            </p>

                        </div>


                        {/* ADMIN LOGIN */}

                        <button
                            type="button"
                            className="admin-login-top-button"
                            onClick={() =>
                                navigate(
                                    "/admin-login"
                                )
                            }
                        >

                            Admin Login

                        </button>

                    </div>


                    {/* ERROR */}

                    {error && (

                        <div className="signin-error">

                            {error}

                        </div>

                    )}


                    {/* LOGIN FORM */}

                    <form
                        onSubmit={handleSubmit}
                    >


                        {/* USERNAME */}

                        <div className="input-group">

                            <label htmlFor="userName">

                                Username

                            </label>


                            <input
                                id="userName"
                                type="text"
                                name="userName"
                                placeholder="Enter your username"
                                value={
                                    formData.userName
                                }
                                onChange={
                                    handleChange
                                }
                            />

                        </div>


                        {/* EMAIL */}

                        <div className="input-group">

                            <label htmlFor="email">

                                Email

                                <span className="optional-text">

                                    (Optional)

                                </span>

                            </label>


                            <input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Enter your email (optional)"
                                value={
                                    formData.email
                                }
                                onChange={
                                    handleChange
                                }
                            />

                        </div>


                        {/* PASSWORD */}

                        <div className="input-group">

                            <label htmlFor="password">

                                Password

                            </label>


                            <div className="password-container">

                                <input
                                    id="password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="password"
                                    placeholder="Enter your password"
                                    value={
                                        formData.password
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                />


                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }
                                >

                                    {showPassword
                                        ? "Hide"
                                        : "Show"
                                    }

                                </button>

                            </div>

                        </div>


                        {/* SUBMIT */}

                        <button
                            type="submit"
                            className="signin-button"
                            disabled={loading}
                        >

                            {loading
                                ? "Signing In..."
                                : "Sign In"
                            }

                        </button>

                    </form>


                    {/* SIGNUP */}

                    <div className="signup-section">

                        <span>

                            Don't have an account?

                        </span>


                        <button
                            onClick={() =>
                                navigate(
                                    "/signup"
                                )
                            }
                            className="signup-link"
                        >

                            Create Account

                        </button>

                    </div>


                    {/* GOOGLE LOGIN */}

                    <div className="google-section">

                        <div className="divider">

                            <span>
                                OR
                            </span>

                        </div>


                        <button
                            className="google-button"
                            onClick={() => {

                                window.location.href =
                                    "http://localhost:8080/oauth2/authorization/google";

                            }}
                        >

                            Continue with Google

                        </button>

                    </div>


                    {/* BACK */}

                    <button
                        className="back-button"
                        onClick={() =>
                            navigate(
                                "/get-started"
                            )
                        }
                    >

                        ← Back to Get Started

                    </button>

                </div>

            </div>


            {/* FOOTER */}

            <footer>

                Contact Management App · Created by Taha Shafiq

            </footer>

        </div>

    );

}

export default Signin;

