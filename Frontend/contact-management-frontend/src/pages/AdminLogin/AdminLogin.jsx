import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

function AdminLogin() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        userName: "",
        password: ""
    });

    const [showPassword, setShowPassword] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");


    const handleChange = (event) => {

        const { name, value } =
            event.target;

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
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(formData)
                }
            );


            if (!response.ok) {

                throw new Error(
                    "Invalid admin credentials"
                );

            }


            const token =
                await response.text();


            localStorage.removeItem(
                "token"
            );


            localStorage.setItem(
                "adminToken",
                token
            );


            navigate(
                "/admin-dashboard"
            );

        } catch (error) {

            console.error(
                "Admin login error:",
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

        <div className="admin-login-page">

            <div className="admin-login-card">

                <button
                    className="admin-back-button"
                    onClick={() =>
                        navigate("/signin")
                    }
                >

                    ← Back to User Login

                </button>


                <div className="admin-login-header">

                    <h1>

                        Admin<span>Panel</span>

                    </h1>


                    <p>

                        Sign in with your administrator
                        credentials.

                    </p>

                </div>


                {error && (

                    <div className="admin-login-error">

                        {error}

                    </div>

                )}


                <form
                    onSubmit={handleSubmit}
                >

                    <div className="admin-input-group">

                        <label>

                            Admin Username

                        </label>


                        <input
                            type="text"
                            name="userName"
                            placeholder="Enter admin username"
                            value={formData.userName}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    <div className="admin-input-group">

                        <label>

                            Password

                        </label>


                        <div className="admin-password-container">

                            <input
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                name="password"
                                placeholder="Enter admin password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />


                            <button
                                type="button"
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


                    <button
                        type="submit"
                        className="admin-submit-button"
                        disabled={loading}
                    >

                        {loading
                            ? "Signing In..."
                            : "Sign In as Admin"
                        }

                    </button>

                </form>

            </div>

        </div>

    );

}

export default AdminLogin;