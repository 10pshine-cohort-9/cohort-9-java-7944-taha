import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [contacts, setContacts] = useState([]);

    const [activeTab, setActiveTab] = useState("users");

    // Selected user for Users -> User Contacts view
    const [selectedUser, setSelectedUser] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");

    const [loading, setLoading] = useState(true);
    const [contactsLoading, setContactsLoading] = useState(false);

    const [error, setError] = useState("");

    const adminToken = localStorage.getItem("adminToken");

    useEffect(() => {
        fetchUsers();
    }, []);

    /*
     * =========================================================
     * FETCH USERS
     * =========================================================
     */

    const fetchUsers = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                "http://localhost:8080/admin/getAllUser",
                {
                    headers: {
                        Authorization: `Bearer ${adminToken}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch users");
            }

            const usersData = await response.json();

            setUsers(usersData);
        } catch (err) {
            console.error(err);

            setError(
                "Unable to load users. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    /*
     * =========================================================
     * FETCH ALL CONTACTS
     *
     * Used only by the "All Contacts" tab.
     * =========================================================
     */

    const fetchAllContacts = async () => {
        try {
            setContactsLoading(true);
            setError("");

            const response = await fetch(
                "http://localhost:8080/admin/getAllContact",
                {
                    headers: {
                        Authorization: `Bearer ${adminToken}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error(
                    "Failed to fetch all contacts"
                );
            }

            const contactsData = await response.json();

            setContacts(contactsData);
        } catch (err) {
            console.error(err);

            setError(
                "Unable to load contacts. Please try again."
            );
        } finally {
            setContactsLoading(false);
        }
    };

    /*
     * =========================================================
     * FETCH CONTACTS OF SELECTED USER
     *
     * GET:
     * /admin/getAllContact?userName=username
     * =========================================================
     */

    const fetchContactsOfUser = async (user) => {
        try {
            setContactsLoading(true);
            setError("");

            const response = await fetch(
                `http://localhost:8080/admin/getAllContact?userName=${encodeURIComponent(
                    user.userName
                )}`,
                {
                    headers: {
                        Authorization: `Bearer ${adminToken}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error(
                    "Failed to fetch user's contacts"
                );
            }

            const contactsData = await response.json();

            setContacts(contactsData);
            setSelectedUser(user);
            setSearchTerm("");
        } catch (err) {
            console.error(err);

            setError(
                "Unable to load this user's contacts. Please try again."
            );
        } finally {
            setContactsLoading(false);
        }
    };

    /*
     * =========================================================
     * REFRESH
     * =========================================================
     */

    const fetchDashboardData = async () => {
        if (selectedUser) {
            await fetchContactsOfUser(selectedUser);
            return;
        }

        if (activeTab === "contacts") {
            await Promise.all([
                fetchUsers(),
                fetchAllContacts(),
            ]);
            return;
        }

        await fetchUsers();
    };

    /*
     * =========================================================
     * DELETE USER
     * =========================================================
     */

    const handleDeleteUser = async (userId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmed) {
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:8080/admin/deleteUser/${userId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${adminToken}`,
                    },
                }
            );

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

            /*
             * If the deleted user is currently selected,
             * return to the users screen.
             */
            if (
                selectedUser &&
                selectedUser.userId === userId
            ) {
                setSelectedUser(null);
                setContacts([]);
                setSearchTerm("");
            }
        } catch (err) {
            console.error(err);
            alert("Failed to delete user.");
        }
    };

    /*
     * =========================================================
     * NAVIGATION
     * =========================================================
     */

    const handleUsersTab = () => {
        setActiveTab("users");
        setSelectedUser(null);
        setContacts([]);
        setSearchTerm("");
        setError("");
    };

    const handleAllContactsTab = async () => {
        setActiveTab("contacts");
        setSelectedUser(null);
        setSearchTerm("");

        await fetchAllContacts();
    };

    /*
     * =========================================================
     * BACK TO USERS
     * =========================================================
     */

    const handleBackToUsers = () => {
        setSelectedUser(null);
        setContacts([]);
        setSearchTerm("");
        setError("");
    };

    /*
     * =========================================================
     * FILTER USERS
     * =========================================================
     */

    const filteredUsers = users.filter((user) => {
        const search = searchTerm.toLowerCase();

        return (
            user.userName
                ?.toLowerCase()
                .includes(search) ||
            user.email
                ?.toLowerCase()
                .includes(search) ||
            user.userId
                ?.toLowerCase()
                .includes(search)
        );
    });

    /*
     * =========================================================
     * FILTER CONTACTS
     * =========================================================
     */

    const filteredContacts = contacts.filter(
        (contact) => {
            const search =
                searchTerm.toLowerCase();

            return (
                contact.userName
                    ?.toLowerCase()
                    .includes(search) ||
                contact.phoneNumber
                    ?.toLowerCase()
                    .includes(search) ||
                contact.phoneLabel
                    ?.toLowerCase()
                    .includes(search) ||
                contact.owner
                    ?.toLowerCase()
                    .includes(search)
            );
        }
    );

    /*
     * =========================================================
     * INITIAL LOADING
     * =========================================================
     */

    if (loading) {
        return (
            <div className="admin-dashboard-loading">
                <div className="admin-loading-spinner"></div>
                <p>Loading dashboard...</p>
            </div>
        );
    }

    /*
     * =========================================================
     * RENDER
     * =========================================================
     */

    return (
        <div className="admin-dashboard">

            {/* =================================================
                SIDEBAR
            ================================================= */}

            <aside className="admin-sidebar">

                <div className="admin-logo">

                    <div className="admin-logo-icon">
                        CM
                    </div>

                    <div>
                        <h2>Contact Manager</h2>
                        <span>Admin Panel</span>
                    </div>

                </div>

                <nav className="admin-nav">

                    {/* USERS */}

                    <button
                        className={
                            activeTab === "users"
                                ? "admin-nav-item active"
                                : "admin-nav-item"
                        }
                        onClick={handleUsersTab}
                    >
                        <span>👥</span>
                        Users
                    </button>

                    {/* ALL CONTACTS */}

                    <button
                        className={
                            activeTab === "contacts"
                                ? "admin-nav-item active"
                                : "admin-nav-item"
                        }
                        onClick={handleAllContactsTab}
                    >
                        <span>📇</span>
                        All Contacts
                    </button>

                </nav>

            </aside>


            {/* =================================================
                MAIN CONTENT
            ================================================= */}

            <main className="admin-main">

                {/* =================================================
                    HEADER
                ================================================= */}

                <header className="admin-header">

                    <div>

                        <h1>
                            {selectedUser
                                ? `${selectedUser.userName}'s Contacts`
                                : activeTab === "users"
                                    ? "Users"
                                    : "All Contacts"}
                        </h1>

                        <p>
                            {selectedUser
                                ? `Contacts stored by ${selectedUser.userName}`
                                : activeTab === "users"
                                    ? "Manage registered application users"
                                    : "View all contacts stored by application users"}
                        </p>

                    </div>

                    <button
                        className="admin-refresh-button"
                        onClick={fetchDashboardData}
                    >
                        ↻ Refresh
                    </button>

                </header>


                {/* =================================================
                    ERROR
                ================================================= */}

                {error && (
                    <div className="admin-error">
                        {error}
                    </div>
                )}


                {/* =================================================
                    STATISTICS
                ================================================= */}

                <section className="admin-stats">

                    <div className="admin-stat-card">

                        <div className="admin-stat-icon">
                            👥
                        </div>

                        <div>
                            <span>Total Users</span>
                            <strong>
                                {users.length}
                            </strong>
                        </div>

                    </div>


                    <div className="admin-stat-card">

                        <div className="admin-stat-icon">
                            📇
                        </div>

                        <div>
                            <span>
                                {selectedUser
                                    ? "User Contacts"
                                    : "Loaded Contacts"}
                            </span>

                            <strong>
                                {contacts.length}
                            </strong>
                        </div>

                    </div>


                    <div className="admin-stat-card">

                        <div className="admin-stat-icon">
                            📱
                        </div>

                        <div>
                            <span>Contact Records</span>

                            <strong>
                                {contacts.length}
                            </strong>
                        </div>

                    </div>

                </section>


                {/* =================================================
                    SEARCH
                ================================================= */}

                <div className="admin-toolbar">

                    <div className="admin-search">

                        <span className="admin-search-icon">
                            🔍
                        </span>

                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) =>
                                setSearchTerm(
                                    e.target.value
                                )
                            }
                            placeholder={
                                selectedUser
                                    ? "Search this user's contacts..."
                                    : activeTab === "users"
                                        ? "Search users by username, email or ID..."
                                        : "Search contacts by name, phone, label or owner..."
                            }
                        />

                    </div>

                </div>


                {/* =================================================
                    USERS LIST
                ================================================= */}

                {activeTab === "users" &&
                    !selectedUser && (

                        <section className="admin-section">

                            <div className="admin-section-header">

                                <div>

                                    <h2>
                                        Registered Users
                                    </h2>

                                    <p>
                                        {filteredUsers.length}{" "}
                                        user
                                        {filteredUsers.length !== 1
                                            ? "s"
                                            : ""}{" "}
                                        found
                                    </p>

                                </div>

                            </div>


                            {filteredUsers.length === 0 ? (

                                <div className="admin-empty-state">

                                    <div>👥</div>

                                    <h3>
                                        No users found
                                    </h3>

                                    <p>
                                        There are no users
                                        matching your search.
                                    </p>

                                </div>

                            ) : (

                                <div className="admin-table-wrapper">

                                    <table className="admin-users-table">

                                        <thead>

                                            <tr>
                                                <th>User</th>
                                                <th>Email</th>
                                                <th>User ID</th>
                                                <th>Action</th>
                                            </tr>

                                        </thead>

                                        <tbody>

                                            {filteredUsers.map(
                                                (user) => (

                                                    <tr
                                                        key={
                                                            user.userId
                                                        }
                                                        className="admin-user-row"
                                                        onClick={() =>
                                                            fetchContactsOfUser(
                                                                user
                                                            )
                                                        }
                                                    >

                                                        <td>

                                                            <div className="admin-user-cell">

                                                                <div className="admin-user-avatar">

                                                                    {user.userName
                                                                        ?.charAt(
                                                                            0
                                                                        )
                                                                        .toUpperCase()}

                                                                </div>

                                                                <div>

                                                                    <strong>
                                                                        {
                                                                            user.userName
                                                                        }
                                                                    </strong>

                                                                    <span className="admin-view-user">
                                                                        View contacts →
                                                                    </span>

                                                                </div>

                                                            </div>

                                                        </td>


                                                        <td>
                                                            {
                                                                user.email
                                                            }
                                                        </td>


                                                        <td>

                                                            <span className="admin-id">
                                                                {
                                                                    user.userId
                                                                }
                                                            </span>

                                                        </td>


                                                        <td>

                                                            <button
                                                                className="admin-delete-button"
                                                                onClick={(
                                                                    e
                                                                ) => {
                                                                    e.stopPropagation();

                                                                    handleDeleteUser(
                                                                        user.userId
                                                                    );
                                                                }}
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

                        </section>
                    )}


                {/* =================================================
                    SELECTED USER CONTACTS
                ================================================= */}

                {selectedUser && (

                    <section className="admin-section">

                        <div className="admin-selected-user-header">

                            <button
                                className="admin-back-button"
                                onClick={
                                    handleBackToUsers
                                }
                            >
                                ← Back to Users
                            </button>

                            <div className="admin-selected-user-info">

                                <div className="admin-selected-user-avatar">
                                    {selectedUser.userName
                                        ?.charAt(0)
                                        .toUpperCase()}
                                </div>

                                <div>

                                    <h2>
                                        {
                                            selectedUser.userName
                                        }
                                    </h2>

                                    <p>
                                        {
                                            selectedUser.email
                                        }
                                    </p>

                                </div>

                            </div>

                        </div>


                        <div className="admin-section-header">

                            <div>

                                <h2>
                                    Contacts
                                </h2>

                                <p>
                                    {
                                        filteredContacts.length
                                    }{" "}
                                    contact
                                    {filteredContacts.length !==
                                    1
                                        ? "s"
                                        : ""}{" "}
                                    found
                                </p>

                            </div>

                        </div>


                        {contactsLoading ? (

                            <div className="admin-contacts-loading">

                                <div className="admin-loading-spinner"></div>

                                <p>
                                    Loading contacts...
                                </p>

                            </div>

                        ) : filteredContacts.length === 0 ? (

                            <div className="admin-empty-state">

                                <div>📇</div>

                                <h3>
                                    No contacts found
                                </h3>

                                <p>
                                    This user has no contacts
                                    matching your search.
                                </p>

                            </div>

                        ) : (

                            <div className="admin-contacts-grid">

                                {filteredContacts.map(
                                    (contact) => (

                                        <div
                                            className="admin-contact-card"
                                            key={
                                                contact.contactId
                                            }
                                        >

                                            <div className="admin-contact-avatar">

                                                {contact.userName
                                                    ?.charAt(
                                                        0
                                                    )
                                                    .toUpperCase()}

                                            </div>


                                            <div className="admin-contact-info">

                                                <h3>
                                                    {
                                                        contact.userName
                                                    }
                                                </h3>

                                                <p>
                                                    {
                                                        contact.phoneNumber
                                                    }
                                                </p>

                                                <span>
                                                    {
                                                        contact.phoneLabel
                                                    }
                                                </span>

                                            </div>

                                        </div>

                                    )
                                )}

                            </div>

                        )}

                    </section>

                )}


                {/* =================================================
                    ALL CONTACTS
                ================================================= */}

                {activeTab === "contacts" &&
                    !selectedUser && (

                        <section className="admin-section">

                            <div className="admin-section-header">

                                <div>

                                    <h2>
                                        All Contacts
                                    </h2>

                                    <p>
                                        {
                                            filteredContacts.length
                                        }{" "}
                                        contact
                                        {filteredContacts.length !==
                                        1
                                            ? "s"
                                            : ""}{" "}
                                        found
                                    </p>

                                </div>

                            </div>


                            {contactsLoading ? (

                                <div className="admin-contacts-loading">

                                    <div className="admin-loading-spinner"></div>

                                    <p>
                                        Loading contacts...
                                    </p>

                                </div>

                            ) : filteredContacts.length === 0 ? (

                                <div className="admin-empty-state">

                                    <div>📇</div>

                                    <h3>
                                        No contacts found
                                    </h3>

                                    <p>
                                        There are no contacts
                                        matching your search.
                                    </p>

                                </div>

                            ) : (

                                <div className="admin-contacts-grid">

                                    {filteredContacts.map(
                                        (contact) => (

                                            <div
                                                className="admin-contact-card"
                                                key={
                                                    contact.contactId
                                                }
                                            >

                                                <div className="admin-contact-avatar">

                                                    {contact.userName
                                                        ?.charAt(
                                                            0
                                                        )
                                                        .toUpperCase()}

                                                </div>


                                                <div className="admin-contact-info">

                                                    <h3>
                                                        {
                                                            contact.userName
                                                        }
                                                    </h3>

                                                    <p>
                                                        {
                                                            contact.phoneNumber
                                                        }
                                                    </p>

                                                    <span>
                                                        {
                                                            contact.phoneLabel
                                                        }
                                                    </span>


                                                    <div className="admin-contact-owner">

                                                        <span className="owner-label">
                                                            Owner
                                                        </span>

                                                        <strong>
                                                            {
                                                                contact.owner ||
                                                                "Unknown"
                                                            }
                                                        </strong>

                                                    </div>


                                                    {contact.userId && (

                                                        <div className="admin-contact-user-id">
                                                            User ID:{" "}
                                                            {
                                                                contact.userId
                                                            }
                                                        </div>

                                                    )}

                                                </div>

                                            </div>

                                        )
                                    )}

                                </div>

                            )}

                        </section>

                    )}

            </main>

        </div>
    );
};

export default AdminDashboard;