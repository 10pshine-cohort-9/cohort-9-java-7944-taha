import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {

    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate("/get-started");
    };

    return (
        <div className="home-page">

            {/* Navigation Bar */}
            <nav className="navbar">

                <div className="navbar-logo">
                    ContactManager
                </div>

                <div className="navbar-links">
                    <a href="#about">About</a>
                    <a href="#features">Features</a>
                    <button
                        className="nav-login-button"
                        onClick={() => navigate("/Signin")}
                    >
                        Login
                    </button>
                </div>

            </nav>


            {/* Hero Section */}
            <main className="hero-section">

                <div className="hero-content">

                    <p className="hero-badge">
                        SIMPLE • SECURE • ORGANIZED
                    </p>

                    <h1>
                        Manage Your Contacts
                        <span> Smarter.</span>
                    </h1>

                    <p className="hero-description">
                        ContactManager is a simple and secure contact management
                        application designed to help you organize, manage and
                        access your contacts easily from one place.
                    </p>

                    <button
                        className="get-started-button"
                        onClick={handleGetStarted}
                    >
                        Get Started
                        <span> →</span>
                    </button>

                </div>

            </main>


            {/* Features Section */}
            <section
                id="features"
                className="features-section"
            >

                <h2>
                    Everything You Need to Manage Contacts
                </h2>

                <p className="features-subtitle">
                    Manage your contacts quickly, securely and efficiently.
                </p>

                <div className="features-container">

                    <div className="feature-card">
                        <div className="feature-icon">
                            👤
                        </div>

                        <h3>
                            Easy Contact Management
                        </h3>

                        <p>
                            Create, update, search and delete your contacts
                            from a single dashboard.
                        </p>
                    </div>


                    <div className="feature-card">
                        <div className="feature-icon">
                            🔐
                        </div>

                        <h3>
                            Secure Authentication
                        </h3>

                        <p>
                            Securely access your contacts using authentication
                            and authorization.
                        </p>
                    </div>


                    <div className="feature-card">
                        <div className="feature-icon">
                            🔎
                        </div>

                        <h3>
                            Quick Search
                        </h3>

                        <p>
                            Quickly find the contacts you need using search
                            and filtering.
                        </p>
                    </div>

                </div>

            </section>


            {/* About Section */}
            <section
                id="about"
                className="about-section"
            >

                <div className="about-content">

                    <p className="section-label">
                        ABOUT THE APPLICATION
                    </p>

                    <h2>
                        Built to Keep Your Contacts Organized
                    </h2>

                    <p>
                        ContactManager provides a centralized place where
                        users can manage their personal and professional
                        contacts.
                    </p>

                    <p>
                        The application is built with modern backend and
                        frontend technologies with a focus on security,
                        maintainability and a clean user experience.
                    </p>

                </div>

            </section>


            {/* Developer Banner */}
            <section className="developer-banner">

                <p>
                    Designed & Developed by
                </p>

                <h2>
                    Taha Shafiq
                </h2>

                <span>
                    Java Backend Developer • Spring Boot • React
                </span>

            </section>


            {/* Footer */}
            <footer className="footer">

                <p>
                    © 2026 ContactManager. All rights reserved.
                </p>

                <p>
                    Built with React & Spring Boot
                </p>

            </footer>

        </div>
    );
}

export default Home;