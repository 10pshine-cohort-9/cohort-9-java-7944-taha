import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signin.css";

function Signin() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        userName: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");
        setLoading(true);

        try {

            const response = await fetch(
                "http://localhost:8080/public/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                }
            );

            if (!response.ok) {
                throw new Error("Invalid username or password");
            }

            // Backend returns JWT as plain text
            const token = await response.text();

            console.log("Login successful");

            // Store JWT
            localStorage.setItem("token", token);

            alert("Login successful!");

            // Later this can become /dashboard
            navigate("/");

        } catch (error) {

            console.error("Login error:", error);

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

                {/* Left Section */}
                <div className="signin-info">

                    <div className="signin-logo">
                        Contact<span>Manager</span>
                    </div>

                    <h1>
                        Welcome
                        <br />
                        <span>Back.</span>
                    </h1>

                    <p>
                        Sign in to access your contacts and
                        continue managing them securely.
                    </p>

                    <div className="signin-benefits">

                        <div className="benefit">
                            <span>✓</span>
                            <p>Secure JWT authentication</p>
                        </div>

                        <div className="benefit">
                            <span>✓</span>
                            <p>Access your contacts</p>
                        </div>

                        <div className="benefit">
                            <span>✓</span>
                            <p>Keep everything organized</p>
                        </div>

                    </div>

                </div>


                {/* Signin Card */}
                <div className="signin-card">

                    <h2>Sign In</h2>

                    <p className="signin-subtitle">
                        Enter your credentials to continue
                    </p>


                    {error && (
                        <div className="signin-error">
                            {error}
                        </div>
                    )}


                    <form onSubmit={handleSubmit}>

                        {/* Username */}
                        <div className="input-group">

                            <label htmlFor="userName">
                                Username
                            </label>

                            <input
                                id="userName"
                                type="text"
                                name="userName"
                                placeholder="Enter your username"
                                value={formData.userName}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* Password */}
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
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />

                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword
                                        ? "Hide"
                                        : "Show"}
                                </button>

                            </div>

                        </div>


                        {/* Submit */}
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


                    {/* Signup */}
                    <div className="signup-section">

                        <span>
                            Don't have an account?
                        </span>

                        <button
                            onClick={() =>
                                navigate("/signup")
                            }
                            className="signup-link"
                        >
                            Create Account
                        </button>

                    </div>


                    {/* Google */}
                    <div className="google-section">

                        <div className="divider">
                            <span>OR</span>
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


                    {/* Back */}
                    <button
                        className="back-button"
                        onClick={() =>
                            navigate("/get-started")
                        }
                    >
                        ← Back to Get Started
                    </button>

                </div>

            </div>

            <footer>
                Contact Management App · Created by Taha Shafiq
            </footer>

        </div>
    );
}

export default Signin;