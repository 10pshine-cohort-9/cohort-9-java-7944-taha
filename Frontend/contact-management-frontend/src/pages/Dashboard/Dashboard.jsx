import React, {
    useEffect,
    useRef,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import "./Dashboard.css";


function Dashboard() {

    const navigate = useNavigate();


    const [contacts, setContacts] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [searchTerm, setSearchTerm] =
        useState("");

    const [showForm, setShowForm] =
        useState(false);

    const [editingContact, setEditingContact] =
        useState(null);

    const [openMenuId, setOpenMenuId] =
        useState(null);


    const menuRef =
        useRef(null);


    const [formData, setFormData] =
        useState({
            userName: "",
            phoneNumber: "",
            phoneLabel: "Personal"
        });


    const token =
        localStorage.getItem("token");


    useEffect(() => {

        fetchContacts();

    }, []);


    /*
     * CLOSE ACTION MENU
     * WHEN USER CLICKS OUTSIDE
     */

    useEffect(() => {

        const handleClickOutside =
            (event) => {

                if (
                    menuRef.current &&
                    !menuRef.current.contains(
                        event.target
                    )
                ) {

                    setOpenMenuId(null);

                }

            };


        document.addEventListener(
            "mousedown",
            handleClickOutside
        );


        return () => {

            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

        };

    }, []);


    /*
     * FETCH CONTACTS
     */

    const fetchContacts =
        async () => {

            try {

                setLoading(true);

                setError("");


                const response =
                    await fetch(
                        "http://localhost:8080/contacts/getContactOfUser",
                        {
                            method: "GET",

                            headers: {
                                "Content-Type":
                                    "application/json",

                                Authorization:
                                    `Bearer ${token}`
                            }
                        }
                    );


                if (
                    response.status === 401
                ) {

                    localStorage.removeItem(
                        "token"
                    );

                    navigate(
                        "/signin"
                    );

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

                setLoading(false);

            }

        };


    /*
     * FORM CHANGE
     */

    const handleChange =
        (event) => {

            const {
                name,
                value
            } = event.target;


            setFormData({
                ...formData,
                [name]: value
            });

        };


    /*
     * OPEN CREATE FORM
     */

    const openCreateForm =
        () => {

            setEditingContact(null);

            setOpenMenuId(null);


            setFormData({
                userName: "",
                phoneNumber: "",
                phoneLabel: "Personal"
            });


            setShowForm(true);

        };


    /*
     * OPEN EDIT FORM
     */

    const openEditForm =
        (contact) => {

            setEditingContact(contact);

            setOpenMenuId(null);


            setFormData({
                userName:
                    contact.userName || "",

                phoneNumber:
                    contact.phoneNumber || "",

                phoneLabel:
                    contact.phoneLabel ||
                    "Personal"
            });


            setShowForm(true);

        };


    /*
     * CREATE OR UPDATE CONTACT
     */

    const handleSubmit =
        async (event) => {

            event.preventDefault();


            try {

                let url =
                    "http://localhost:8080/contacts/createContact";


                let method =
                    "POST";


                if (
                    editingContact
                ) {

                    url =
                        `http://localhost:8080/contacts/changeContact/${editingContact.contactId}`;


                    method =
                        "PUT";

                }


                const response =
                    await fetch(
                        url,
                        {
                            method: method,

                            headers: {
                                "Content-Type":
                                    "application/json",

                                Authorization:
                                    `Bearer ${token}`
                            },

                            body:
                                JSON.stringify(
                                    formData
                                )
                        }
                    );


                if (
                    response.status === 401
                ) {

                    localStorage.removeItem(
                        "token"
                    );

                    navigate(
                        "/signin"
                    );

                    return;

                }


                if (
                    !response.ok
                ) {

                    throw new Error(
                        editingContact
                            ? "Failed to update contact"
                            : "Failed to create contact"
                    );

                }


                setShowForm(false);

                setEditingContact(null);


                setFormData({
                    userName: "",
                    phoneNumber: "",
                    phoneLabel: "Personal"
                });


                fetchContacts();

            } catch (error) {

                console.error(error);

                setError(
                    error.message
                );

            }

        };


    /*
     * DELETE CONTACT
     */

    const handleDelete =
        async (contactId) => {

            const confirmed =
                window.confirm(
                    "Are you sure you want to delete this contact?"
                );


            if (!confirmed) {

                return;

            }


            try {

                setOpenMenuId(null);


                const response =
                    await fetch(
                        `http://localhost:8080/contacts/deleteContact/${contactId}`,
                        {
                            method:
                                "DELETE",

                            headers: {
                                Authorization:
                                    `Bearer ${token}`
                            }
                        }
                    );


                if (
                    response.status === 401
                ) {

                    localStorage.removeItem(
                        "token"
                    );

                    navigate(
                        "/signin"
                    );

                    return;

                }


                if (
                    !response.ok
                ) {

                    throw new Error(
                        "Failed to delete contact"
                    );

                }


                setContacts(
                    (
                        previousContacts
                    ) =>
                        previousContacts.filter(
                            (contact) =>
                                contact.contactId !==
                                contactId
                        )
                );

            } catch (error) {

                console.error(error);

                setError(
                    error.message
                );

            }

        };


    /*
     * LOGOUT
     */

    const handleLogout =
        () => {

            localStorage.removeItem(
                "token"
            );

            navigate(
                "/signin"
            );

        };


    /*
     * SEARCH CONTACTS
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

        <div className="dashboard-page">


            {/* SIDEBAR */}

            <aside className="sidebar">

                <div className="brand">

                    Contact
                    <span>
                        Manager
                    </span>

                </div>


                <nav className="sidebar-menu">

                    <button
                        className="active"
                        onClick={() =>
                            navigate(
                                "/dashboard"
                            )
                        }
                    >

                        📱 Contacts

                    </button>


                    <button
                        onClick={() =>
                            navigate(
                                "/profile"
                            )
                        }
                    >

                        👤 Profile

                    </button>

                </nav>


                <button
                    className="logout-button"
                    onClick={
                        handleLogout
                    }
                >

                    Logout

                </button>

            </aside>


            {/* MAIN CONTENT */}

            <main className="dashboard-content">


                <div className="dashboard-header">

                    <div>

                        <h1>
                            My Contacts
                        </h1>

                        <p>
                            Manage all your saved contacts.
                        </p>

                    </div>


                    <button
                        className="add-contact-button"
                        onClick={
                            openCreateForm
                        }
                    >

                        + Add Contact

                    </button>

                </div>


                {/* SEARCH */}

                <div
                    className="
                        contact-search-container
                    "
                >

                    <span
                        className="
                            search-icon
                        "
                    >
                        🔍
                    </span>


                    <input
                        type="text"

                        className="
                            contact-search-input
                        "

                        placeholder="
                            Search contacts by name, phone or label...
                        "

                        value={
                            searchTerm
                        }

                        onChange={
                            (event) =>
                                setSearchTerm(
                                    event.target.value
                                )
                        }
                    />

                </div>


                {/* ERROR */}

                {error && (

                    <div
                        className="
                            dashboard-error
                        "
                    >

                        {error}

                    </div>

                )}


                {/* LOADING */}

                {loading && (

                    <p>
                        Loading contacts...
                    </p>

                )}


                {/* NO CONTACTS */}

                {!loading &&
                    !error &&
                    contacts.length === 0 && (

                        <div
                            className="
                                empty-state
                            "
                        >

                            <h2>
                                No Contacts Yet
                            </h2>

                            <p>
                                Start building your contact list
                                by adding your first contact.
                            </p>

                        </div>

                    )}


                {/* SEARCH EMPTY */}

                {!loading &&
                    contacts.length > 0 &&
                    filteredContacts.length === 0 && (

                        <div
                            className="
                                empty-state
                            "
                        >

                            <h2>
                                No Contacts Found
                            </h2>

                            <p>
                                No contacts match "
                                {searchTerm}
                                ".
                            </p>

                        </div>

                    )}


                {/* CONTACT GRID */}

                <div
                    className="
                        contacts-grid
                    "
                >

                    {filteredContacts.map(
                        (contact) => (

                            <div
                                className="
                                    contact-card
                                "

                                key={
                                    contact.contactId
                                }
                            >


                                {/* AVATAR */}

                                <div
                                    className="
                                        contact-avatar
                                    "
                                >

                                    {contact.userName
                                        ?.charAt(0)
                                        .toUpperCase()
                                    }

                                </div>


                                {/* CONTACT INFO */}

                                <div
                                    className="
                                        contact-info
                                    "
                                >

                                    <h3
                                        title={
                                            contact.userName
                                        }
                                    >

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


                                {/* ACTION MENU */}

                                <div
                                    className="
                                        contact-actions
                                    "

                                    ref={
                                        openMenuId ===
                                        contact.contactId
                                            ? menuRef
                                            : null
                                    }
                                >


                                    {/* THREE DOTS */}

                                    {openMenuId !==
                                        contact.contactId && (

                                        <button
                                            className="
                                                action-menu-button
                                            "

                                            onClick={
                                                (
                                                    event
                                                ) => {

                                                    event.stopPropagation();


                                                    setOpenMenuId(
                                                        contact.contactId
                                                    );

                                                }
                                            }
                                        >

                                            ⋮

                                        </button>

                                    )}


                                    {/* POPUP */}

                                    {openMenuId ===
                                        contact.contactId && (

                                        <div
                                            className="
                                                action-popup
                                            "
                                        >

                                            <button
                                                className="
                                                    edit-action
                                                "

                                                onClick={() =>
                                                    openEditForm(
                                                        contact
                                                    )
                                                }
                                            >

                                                <span>
                                                    ✏
                                                </span>

                                                Edit

                                            </button>


                                            <button
                                                className="
                                                    delete-action
                                                "

                                                onClick={() =>
                                                    handleDelete(
                                                        contact.contactId
                                                    )
                                                }
                                            >

                                                <span>
                                                    🗑
                                                </span>

                                                Delete

                                            </button>

                                        </div>

                                    )}

                                </div>

                            </div>

                        )
                    )}

                </div>


                {/* CONTACT FORM */}

                {showForm && (

                    <div
                        className="
                            contact-modal
                        "
                    >

                        <div
                            className="
                                contact-form-card
                            "
                        >

                            <h2>

                                {editingContact
                                    ? "Edit Contact"
                                    : "Add Contact"
                                }

                            </h2>


                            <form
                                onSubmit={
                                    handleSubmit
                                }
                            >


                                {/* NAME */}

                                <div
                                    className="
                                        form-group
                                    "
                                >

                                    <label>
                                        Contact Name
                                    </label>


                                    <input
                                        type="text"

                                        name="userName"

                                        value={
                                            formData.userName
                                        }

                                        onChange={
                                            handleChange
                                        }

                                        placeholder="
                                            Enter contact name
                                        "

                                        required
                                    />

                                </div>


                                {/* PHONE */}

                                <div
                                    className="
                                        form-group
                                    "
                                >

                                    <label>
                                        Phone Number
                                    </label>


                                    <input
                                        type="text"

                                        name="phoneNumber"

                                        value={
                                            formData.phoneNumber
                                        }

                                        onChange={
                                            handleChange
                                        }

                                        placeholder="
                                            Enter phone number
                                        "

                                        required
                                    />

                                </div>


                                {/* LABEL */}

                                <div
                                    className="
                                        form-group
                                    "
                                >

                                    <label>
                                        Phone Label
                                    </label>


                                    <select
                                        name="
                                            phoneLabel
                                        "

                                        value={
                                            formData.phoneLabel
                                        }

                                        onChange={
                                            handleChange
                                        }
                                    >

                                        <option
                                            value="
                                                Personal
                                            "
                                        >
                                            Personal
                                        </option>


                                        <option
                                            value="
                                                Work
                                            "
                                        >
                                            Work
                                        </option>


                                        <option
                                            value="
                                                Home
                                            "
                                        >
                                            Home
                                        </option>


                                        <option
                                            value="
                                                Other
                                            "
                                        >
                                            Other
                                        </option>

                                    </select>

                                </div>


                                {/* FORM BUTTONS */}

                                <div
                                    className="
                                        form-actions
                                    "
                                >

                                    <button
                                        type="button"

                                        onClick={() =>
                                            setShowForm(
                                                false
                                            )
                                        }
                                    >

                                        Cancel

                                    </button>


                                    <button
                                        type="submit"
                                    >

                                        {editingContact
                                            ? "Update Contact"
                                            : "Create Contact"
                                        }

                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                )}

            </main>

        </div>

    );

}


export default Dashboard;
