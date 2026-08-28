import React, {
    useEffect,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import "./AdminDashboard.css";


function AdminDashboard() {

    const navigate =
        useNavigate();


    const [users, setUsers] =
        useState([]);

    const [contacts, setContacts] =
        useState([]);


    const [loadingUsers, setLoadingUsers] =
        useState(true);

    const [loadingContacts, setLoadingContacts] =
        useState(false);


    const [error, setError] =
        useState("");


    const [activeTab, setActiveTab] =
        useState("users");


    const [searchTerm, setSearchTerm] =
        useState("");


    const adminToken =
        localStorage.getItem(
            "adminToken"
        );


    useEffect(() => {

        if (!adminToken) {

            navigate(
                "/admin-login"
            );

            return;

        }


        fetchUsers();

    }, []);


    const handleUnauthorized = () => {

        localStorage.removeItem(
            "adminToken"
        );

        navigate(
            "/admin-login"
        );

    };


    const fetchUsers = async () => {

        try {

            setLoadingUsers(true);

            setError("");


            const response =
                await fetch(
                    "http://localhost:8080/admin/getAllUser",
                    {
                        method: "GET",

                        headers: {

                            Authorization:
                                `Bearer ${adminToken}`

                        }

                    }
                );


            if (
                response.status === 401 ||
                response.status === 403
            ) {

                handleUnauthorized();

                return;

            }


            if (!response.ok) {

                throw new Error(
                    "Failed to load users"
                );

            }


            const data =
                await response.json();


            setUsers(data);

        } catch (error) {

            console.error(error);

            setError(
                error.message
            );

        } finally {

            setLoadingUsers(false);

        }

    };


    const fetchContacts = async () => {

        try {

            setLoadingContacts(true);

            setError("");


            const response =
                await fetch(
                    "http://localhost:8080/admin/getAllContact",
                    {
                        method: "GET",

                        headers: {

                            Authorization:
                                `Bearer ${adminToken}`

                        }

                    }
                );


            if (
                response.status === 401 ||
                response.status === 403
            ) {

                handleUnauthorized();

                return;

            }


            if (!response.ok) {

                throw new Error(
                    "Failed to load contacts"
                );

            }


            const data =
                await response.json();


            setContacts(data);

        } catch (error) {

            console.error(error);

            setError(
                error.message
            );

        } finally {

            setLoadingContacts(false);

        }

    };


    const handleTabChange = (tab) => {

        setActiveTab(tab);

        setError("");

        setSearchTerm("");


        if (
            tab === "contacts" &&
            contacts.length === 0
        ) {

            fetchContacts();

        }

    };


    const handleDeleteUser =
        async (userId, userName) => {

            const confirmed =
                window.confirm(
                    `Are you sure you want to delete ${userName}?`
                );


            if (!confirmed) {

                return;

            }


            try {

                const response =
                    await fetch(
                        `http://localhost:8080/admin/deleteUser/${userId}`,
                        {
                            method: "DELETE",

                            headers: {

                                Authorization:
                                    `Bearer ${adminToken}`

                            }

                        }
                    );


                if (
                    response.status === 401 ||
                    response.status === 403
                ) {

                    handleUnauthorized();

                    return;

                }


                if (!response.ok) {

                    throw new Error(
                        "Failed to delete user"
                    );

                }


                setUsers(
                    (previousUsers) =>
                        previousUsers.filter(
                            (user) =>
                                user.userId !== userId
                        )
                );


                setContacts(
                    (previousContacts) =>
                        previousContacts.filter(
                            (contact) =>
                                contact.userId !== userId
                        )
                );

            } catch (error) {

                console.error(error);

                setError(
                    error.message
                );

            }

        };


    const handleLogout = () => {

        localStorage.removeItem(
            "adminToken"
        );

        navigate(
            "/signin"
        );

    };


    /*
     * FILTER USERS
     */

    const filteredUsers =
        users.filter(
            (user) => {

                const search =
                    searchTerm.toLowerCase();


                return (

                    user.userName
                        ?.toLowerCase()
                        .includes(search)

                    ||

                    user.email
                        ?.toLowerCase()
                        .includes(search)

                );

            }
        );


    /*
     * FILTER CONTACTS
     */

    const filteredContacts =
        contacts.filter(
            (contact) => {

                const search =
                    searchTerm.toLowerCase();


                return (

                    contact.userName
                        ?.toLowerCase()
                        .includes(search)

                    ||

                    contact.phoneNumber
                        ?.toLowerCase()
                        .includes(search)

                    ||

                    contact.phoneLabel
                        ?.toLowerCase()
                        .includes(search)

                );

            }
        );


    return (

        <div className="admin-dashboard-page">


            {/* SIDEBAR */}

            <aside className="admin-sidebar">

                <div className="admin-brand">

                    Contact<span>Manager</span>

                </div>


                <div className="admin-label">

                    ADMIN PANEL

                </div>


                <nav className="admin-menu">

                    <button
                        className={
                            activeTab === "users"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            handleTabChange(
                                "users"
                            )
                        }
                    >

                        👥 Users

                    </button>


                    <button
                        className={
                            activeTab === "contacts"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            handleTabChange(
                                "contacts"
                            )
                        }
                    >

                        📱 All Contacts

                    </button>

                </nav>


                <button
                    className="admin-logout-button"
                    onClick={handleLogout}
                >

                    Logout

                </button>

            </aside>


            {/* CONTENT */}

            <main className="admin-content">


                <div className="admin-header">

                    <div>

                        <h1>

                            {activeTab === "users"
                                ? "Users"
                                : "All Contacts"
                            }

                        </h1>


                        <p>

                            {activeTab === "users"
                                ? "Manage registered users."
                                : "View all contacts in the system."
                            }

                        </p>

                    </div>


                    <div className="admin-stats">

                        <div>

                            <span>
                                Total Users
                            </span>

                            <strong>
                                {users.length}
                            </strong>

                        </div>


                        <div>

                            <span>
                                Total Contacts
                            </span>

                            <strong>
                                {contacts.length}
                            </strong>

                        </div>

                    </div>

                </div>


                {/* SEARCH */}

                <div className="admin-search-container">

                    <span className="admin-search-icon">

                        🔍

                    </span>


                    <input
                        type="text"
                        className="admin-search-input"
                        placeholder={
                            activeTab === "users"
                                ? "Search users by username or email..."
                                : "Search contacts by name, phone or label..."
                        }
                        value={searchTerm}
                        onChange={(event) =>
                            setSearchTerm(
                                event.target.value
                            )
                        }
                    />

                </div>


                {error && (

                    <div className="admin-dashboard-error">

                        {error}

                    </div>

                )}


                {/* USERS */}

                {activeTab === "users" && (

                    <>

                        {loadingUsers && (

                            <p>
                                Loading users...
                            </p>

                        )}


                        {!loadingUsers &&
                            users.length === 0 && (

                                <div className="admin-empty-state">

                                    <h2>
                                        No Users Found
                                    </h2>

                                </div>

                            )}


                        {!loadingUsers &&
                            users.length > 0 &&
                            filteredUsers.length === 0 && (

                                <div className="admin-empty-state">

                                    <h2>
                                        No Matching Users
                                    </h2>

                                    <p>
                                        No users match "
                                        {searchTerm}
                                        ".
                                    </p>

                                </div>

                            )}


                        {!loadingUsers &&
                            filteredUsers.length > 0 && (

                                <div className="admin-table-wrapper">

                                    <table>

                                        <thead>

                                            <tr>

                                                <th>
                                                    Username
                                                </th>

                                                <th>
                                                    Email
                                                </th>

                                                <th>
                                                    Action
                                                </th>

                                            </tr>

                                        </thead>


                                        <tbody>

                                            {filteredUsers.map(
                                                (user) => (

                                                    <tr
                                                        key={
                                                            user.userId
                                                        }
                                                    >

                                                        <td>

                                                            {user.userName}

                                                        </td>


                                                        <td>

                                                            {user.email}

                                                        </td>


                                                        <td>

                                                            <button
                                                                className="delete-user-button"
                                                                onClick={() =>
                                                                    handleDeleteUser(
                                                                        user.userId,
                                                                        user.userName
                                                                    )
                                                                }
                                                            >

                                                                Delete

                                                            </button>

                                                        </td>

                                                    </tr>

                                                )
                                            )}

                                        </tbody>

                                    </table>

                                </div>

                            )}

                    </>

                )}


                {/* CONTACTS */}

                {activeTab === "contacts" && (

                    <>

                        {loadingContacts && (

                            <p>
                                Loading contacts...
                            </p>

                        )}


                        {!loadingContacts &&
                            contacts.length === 0 && (

                                <div className="admin-empty-state">

                                    <h2>
                                        No Contacts Found
                                    </h2>

                                </div>

                            )}


                        {!loadingContacts &&
                            contacts.length > 0 &&
                            filteredContacts.length === 0 && (

                                <div className="admin-empty-state">

                                    <h2>
                                        No Matching Contacts
                                    </h2>

                                    <p>
                                        No contacts match "
                                        {searchTerm}
                                        ".
                                    </p>

                                </div>

                            )}


                        <div className="admin-contacts-grid">

                            {!loadingContacts &&
                                filteredContacts.map(
                                    (contact) => (

                                        <div
                                            className="admin-contact-card"
                                            key={
                                                contact.contactId
                                            }
                                        >

                                            <div className="admin-contact-avatar">

                                                {contact.userName
                                                    ?.charAt(0)
                                                    .toUpperCase()
                                                }

                                            </div>


                                            <div>

                                                <h3>

                                                    {contact.userName}

                                                </h3>


                                                <p>

                                                    {contact.phoneNumber}

                                                </p>


                                                <span>

                                                    {contact.phoneLabel}

                                                </span>

                                            </div>

                                        </div>

                                    )
                                )}

                        </div>

                    </>

                )}

            </main>

        </div>

    );

}


export default AdminDashboard;