import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, BrowserRouter } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Overview from "./pages/overview/Overview";
import { Provider, useSelector } from "react-redux";
import { store } from "./services/store";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AddFriend } from "./pages/addFriend/AddFriend";
import { AppLayout } from "./layouts/AppLayout";
import { Profile } from "./pages/profile/Profile";

const ProtectedRoute = () => {
    const isLoggedIn = useSelector((state) => state.auth.user != null);

    if (!isLoggedIn) {
        return <Navigate to="/" replace />;
    }

    return (
        <AppLayout>
            <Outlet />
        </AppLayout>
    )
};

function App() {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Provider store={store}>
                <BrowserRouter basename="/friends">
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route element={<ProtectedRoute />}>
                            <Route path="/overview" element={<Overview />} />
                            <Route path="/addfriend" element={<AddFriend />} />
                            <Route path="/profile" element={<Profile />} />
                        </Route>
                        <Route path="*" element={<Navigate to="/login" />} />
                    </Routes>
                </BrowserRouter>
            </Provider>
        </LocalizationProvider>
    );
}

export default App;