import { Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import Home from "./pages/Home/Home";
import GetStarted from "./pages/GetStarted/GetStarted";
import Signin from "./pages/Signin/Signin";
import Signup from "./pages/Signup/Signup";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/Profile/Profile";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

    return (
        <Routes>

            {/* Public Pages */}

            <Route
                path="/"
                element={<Home />}
            />

            <Route
                path="/get-started"
                element={<GetStarted />}
            />

            <Route
                path="/signin"
                element={<Signin />}
            />

            <Route
                path="/signup"
                element={<Signup />}
            />


            {/* Protected Pages */}

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                }
            />

            <Route
    path="/admin-login"
    element={<AdminLogin />}
/>

    <Route
        path="/admin-dashboard"
        element={<AdminDashboard />}
    />

        </Routes>
    );
}

export default App;