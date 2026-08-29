import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(true);

    const [updating, setUpdating] = useState(false);

    const [error, setError] = useState("");

    const [isEditing, setIsEditing] = useState(false);

    const token = localStorage.getItem("token");


    useEffect(() => {
        fetchUserProfile();
    }, []);


    const fetchUserProfile = async () => {

        try {

            setLoading(true);

            const response = await fetch(
                "http://localhost:8080/users/getUserByUserName",
                {
                    method: "GET",

                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
            );


            if (response.status === 401) {

                localStorage.removeItem("token");

                navigate("/signin");

                return;

            }


            if (!response.ok) {

                throw new Error(
                    "Failed to load profile"
                );

            }


            const data = await response.json();


            setUser(data);


            setFormData({
                firstName: data.firstName || "",
                lastName: data.lastName || "",
                email: data.email || "",
                password: ""
            });


        } catch (error) {

            console.error("Profile error:", error);

            setError(error.message);

        } finally {

            setLoading(false);

        }

    };


    const handleChange = (event) => {

        const { name, value } = event.target;


        setFormData((previousData) => ({
            ...previousData,
            [name]: value
        }));

    };


    const handleEditProfile = () => {

        setError("");

        setIsEditing(true);

    };


    const handleCancelEdit = () => {

        if (user) {

            setFormData({
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                email: user.email || "",
                password: ""
            });

        }


        setError("");

        setIsEditing(false);

    };


    const handleUpdateProfile = async () => {

        try {

            setUpdating(true);

            setError("");


            const response = await fetch(
                "http://localhost:8080/users/changeUser",
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        email: formData.email,
                        password: formData.password
                    })
                }
            );


            if (response.status === 401) {

                localStorage.removeItem("token");

                navigate("/signin");

                return;

            }


            if (!response.ok) {

                throw new Error(
                    "Failed to update profile"
                );

            }


            const updatedUser = await response.json();


            setUser(updatedUser);


            setFormData({
                firstName: updatedUser.firstName || "",
                lastName: updatedUser.lastName || "",
                email: updatedUser.email || "",
                password: ""
            });


            setIsEditing(false);


            alert("Profile updated successfully!");


        } catch (error) {

            console.error(
                "Update profile error:",
                error
            );

            setError(error.message);

        } finally {

            setUpdating(false);

        }

    };


    const handleLogout = () => {

        localStorage.removeItem("token");

        navigate("/signin");

    };


    if (loading) {

        return (
            <p>
                Loading profile...
            </p>
        );

    }


    return (

        <div className="profile-page">


            {/* Sidebar */}

            <aside className="sidebar">


                <div className="brand">

                    Contact<span>Manager</span>

                </div>


                <nav className="sidebar-menu">


                    <button
                        onClick={() =>
                            navigate("/dashboard")
                        }
                    >
                        📱 Contacts
                    </button>


                    <button className="active">

                        👤 Profile

                    </button>


                </nav>


                <button
                    className="logout-button"
                    onClick={handleLogout}
                >
                    Logout
                </button>


            </aside>



            {/* Profile Content */}

            <main className="profile-content">


                <h1>
                    My Profile
                </h1>


                <p className="profile-subtitle">

                    Manage your personal information.

                </p>


                {error && (

                    <div className="profile-error">

                        {error}

                    </div>

                )}


                {user && (

                    <div className="profile-card">


                        {/* Profile Avatar */}

                        <div className="profile-avatar">

                            {formData.firstName
                                ?.charAt(0)
                                .toUpperCase()
                            }

                        </div>



                        <div className="profile-details">


                            {/* First Name */}

                            <div className="profile-row">

                                <label>
                                    First Name
                                </label>


                                {isEditing ? (

                                    <input
                                        type="text"
                                        name="firstName"
                                        value={
                                            formData.firstName
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />

                                ) : (

                                    <p>
                                        {user.firstName}
                                    </p>

                                )}

                            </div>



                            {/* Last Name */}

                            <div className="profile-row">

                                <label>
                                    Last Name
                                </label>


                                {isEditing ? (

                                    <input
                                        type="text"
                                        name="lastName"
                                        value={
                                            formData.lastName
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />

                                ) : (

                                    <p>

                                        {user.lastName ||
                                            "Not provided"}

                                    </p>

                                )}

                            </div>



                            {/* Username */}

                            <div className="profile-row">

                                <label>
                                    Username
                                </label>


                                <p>
                                    {user.userName}
                                </p>

                            </div>



                            {/* Email */}

                            <div className="profile-row">

                                <label>
                                    Email
                                </label>


                                {isEditing ? (

                                    <input
                                        type="email"
                                        name="email"
                                        value={
                                            formData.email
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />

                                ) : (

                                    <p>
                                        {user.email}
                                    </p>

                                )}

                            </div>



                            {/* Password */}

                            {isEditing && (

                                <div className="profile-row">

                                    <label>
                                        New Password
                                    </label>


                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="
                                        Leave empty to keep current password
                                        "
                                        value={
                                            formData.password
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />

                                </div>

                            )}


                        </div>



                        {/* Buttons */}

                        {!isEditing ? (

                            <button
                                className="edit-profile-button"
                                onClick={
                                    handleEditProfile
                                }
                            >
                                Edit Profile
                            </button>

                        ) : (

                            <div className="profile-action-buttons">


                                <button
                                    className="save-profile-button"
                                    onClick={
                                        handleUpdateProfile
                                    }
                                    disabled={updating}
                                >

                                    {updating
                                        ? "Saving..."
                                        : "Save Changes"
                                    }

                                </button>


                                <button
                                    className="cancel-profile-button"
                                    onClick={
                                        handleCancelEdit
                                    }
                                    disabled={updating}
                                >

                                    Cancel

                                </button>


                            </div>

                        )}


                    </div>

                )}


            </main>


        </div>

    );

}


export default Profile;

