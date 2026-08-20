import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

function Signup() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        userName: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };


    const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        const response = await fetch("http://localhost:8080/public/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error(`Signup failed: ${response.status}`);
        }

        const data = await response.json();

        console.log("Signup successful:", data);

        alert("Account created successfully!");

        navigate("/signin");

    } catch (error) {
        console.error("Signup error:", error);
        alert("Unable to connect to server.");
    }
};
    return (
        <div className="signup-page">

            <div className="signup-wrapper">

                {/* Left Information Section */}
                <div className="signup-info">

                    <div className="signup-logo">
                        Contact<span>Manager</span>
                    </div>

                    <h1>
                        Create your
                        <br />
                        <span>Contact Manager</span>
                        <br />
                        account.
                    </h1>

                    <p>
                        Start managing your contacts in one secure
                        and organized place.
                    </p>

                    <div className="signup-benefits">

                        <div className="benefit">
                            <span>✓</span>
                            <p>Manage your contacts easily</p>
                        </div>

                        <div className="benefit">
                            <span>✓</span>
                            <p>Keep your information organized</p>
                        </div>

                        <div className="benefit">
                            <span>✓</span>
                            <p>Secure authentication</p>
                        </div>

                    </div>

                </div>


                {/* Signup Card */}
                <div className="signup-card">

                    <h2>Create Account</h2>

                    <p className="signup-subtitle">
                        Enter your details to get started
                    </p>

                    <form onSubmit={handleSubmit}>

                        {/* First & Last Name */}
                        <div className="name-row">

                            <div className="input-group">
                                <label htmlFor="firstName">
                                    First Name
                                </label>

                                <input
                                    id="firstName"
                                    type="text"
                                    name="firstName"
                                    placeholder="Enter first name"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label htmlFor="lastName">
                                    Last Name
                                </label>

                                <input
                                    id="lastName"
                                    type="text"
                                    name="lastName"
                                    placeholder="Enter last name"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                        </div>


                        {/* Email */}
                        <div className="input-group">

                            <label htmlFor="email">
                                Email Address
                            </label>

                            <input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* Username */}
                        <div className="input-group">

                            <label htmlFor="userName">
                                Username
                            </label>

                            <input
                                id="userName"
                                type="text"
                                name="userName"
                                placeholder="Choose a username"
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
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Create a password"
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
                                    {showPassword ? "Hide" : "Show"}
                                </button>

                            </div>

                        </div>


                        {/* Submit */}
                        <button
                            type="submit"
                            className="create-account-btn"
                        >
                            Create Account
                        </button>

                    </form>


                    {/* Sign In */}
                    <div className="signin-section">

                        <span>
                            Already have an account?
                        </span>

                        <button
                            onClick={() => navigate("/signin")}
                            className="signin-link"
                        >
                            Sign In
                        </button>

                    </div>


                    {/* Back */}
                    <button
                        className="back-button"
                        onClick={() => navigate("/get-started")}
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

export default Signup;