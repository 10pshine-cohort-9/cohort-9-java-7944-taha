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

    const [errors, setErrors] = useState({});

    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);


    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });

        // Remove error when user starts correcting the field
        setErrors(prev => ({
            ...prev,
            [name]: ""
        }));
    };


    const handleSubmit = async (event) => {

        event.preventDefault();

        setErrors({});
        setLoading(true);

        try {

            const response = await fetch(
                "http://localhost:8080/public/signup",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(formData)
                }
            );


            const data = await response.json();


            if (!response.ok) {

                /*
                 * Backend should return:
                 *
                 * {
                 *     "firstName": "First name is required",
                 *     "email": "Please enter a valid email address",
                 *     "userName": "Username is required",
                 *     "password": "Password must contain at least 8 characters..."
                 * }
                 */

                if (response.status === 400) {

                    setErrors(data);

                } else {

                    setErrors({
                        general:
                            data.message ||
                            "Unable to create your account. Please try again."
                    });
                }

                return;
            }


            alert("Account created successfully!");

            navigate("/signin");


        } catch (error) {

            console.error("Signup error:", error);

            setErrors({
                general:
                    "Unable to connect to the server. Please try again later."
            });

        } finally {

            setLoading(false);
        }
    };


    return (
        <div className="signup-page">

            <div className="signup-wrapper">


                {/* LEFT INFORMATION SECTION */}

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


                {/* SIGNUP CARD */}

                <div className="signup-card">

                    <h2>Create Account</h2>

                    <p className="signup-subtitle">
                        Enter your details to get started
                    </p>


                    {/* GENERAL ERROR */}

                    {errors.general && (
                        <div className="general-error">
                            {errors.general}
                        </div>
                    )}


                    <form onSubmit={handleSubmit}>


                        {/* FIRST & LAST NAME */}

                        <div className="name-row">


                            {/* FIRST NAME */}

                            <div className="input-group">

                                <label htmlFor="firstName">
                                    First Name
                                </label>

                                <input
                                    id="firstName"
                                    type="text"
                                    name="firstName"
                                    placeholder="e.g. Taha"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className={
                                        errors.firstName
                                            ? "input-error"
                                            : ""
                                    }
                                />

                                <span className="input-hint">
                                    2–30 characters
                                </span>

                                {errors.firstName && (
                                    <span className="field-error">
                                        {errors.firstName}
                                    </span>
                                )}

                            </div>


                            {/* LAST NAME */}

                            <div className="input-group">

                                <label htmlFor="lastName">
                                    Last Name
                                </label>

                                <input
                                    id="lastName"
                                    type="text"
                                    name="lastName"
                                    placeholder="e.g. Shafiq"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className={
                                        errors.lastName
                                            ? "input-error"
                                            : ""
                                    }
                                />

                                <span className="input-hint">
                                    Optional · Maximum 30 characters
                                </span>

                                {errors.lastName && (
                                    <span className="field-error">
                                        {errors.lastName}
                                    </span>
                                )}

                            </div>

                        </div>


                        {/* EMAIL */}

                        <div className="input-group">

                            <label htmlFor="email">
                                Email Address
                            </label>

                            <input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="e.g. taha@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                className={
                                    errors.email
                                        ? "input-error"
                                        : ""
                                }
                            />

                            <span className="input-hint">
                                Enter a valid email address
                            </span>

                            {errors.email && (
                                <span className="field-error">
                                    {errors.email}
                                </span>
                            )}

                        </div>


                        {/* USERNAME */}

                        <div className="input-group">

                            <label htmlFor="userName">
                                Username
                            </label>

                            <input
                                id="userName"
                                type="text"
                                name="userName"
                                placeholder="e.g. taha_shafiq"
                                value={formData.userName}
                                onChange={handleChange}
                                className={
                                    errors.userName
                                        ? "input-error"
                                        : ""
                                }
                            />

                            <span className="input-hint">
                                3–20 characters · Letters, numbers,
                                and underscores only
                            </span>

                            {errors.userName && (
                                <span className="field-error">
                                    {errors.userName}
                                </span>
                            )}

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
                                    placeholder="Create a strong password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={
                                        errors.password
                                            ? "input-error"
                                            : ""
                                    }
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
                                        : "Show"}
                                </button>

                            </div>


                            <span className="input-hint password-hint">
                                At least 8 characters, including:
                                <br />
                                • One uppercase letter
                                <br />
                                • One lowercase letter
                                <br />
                                • One number
                                <br />
                                • One special character
                            </span>


                            {errors.password && (
                                <span className="field-error">
                                    {errors.password}
                                </span>
                            )}

                        </div>


                        {/* SUBMIT */}

                        <button
                            type="submit"
                            className="create-account-btn"
                            disabled={loading}
                        >

                            {loading
                                ? "Creating Account..."
                                : "Create Account"}

                        </button>

                    </form>


                    {/* SIGN IN */}

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


                    {/* BACK */}

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

export default Signup;

