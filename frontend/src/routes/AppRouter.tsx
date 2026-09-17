import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom"
import Login from "../pages/auth/Login"
import Register from "../pages/auth/Register"
import Dashboard from "../pages/dashboard/Dashboard"
import Todos from "../pages/todos/Todos"
import Profile from "../pages/profile/Profile"
import Settings from "../pages/settings/Settings"
import AppLayout from "../components/layout/AppLayout"
import ProtectedRoute from "./ProtectedRoute"
export default function AppRouter(){
    return(
        <BrowserRouter>
            <Routes>
                {/* <Route
                    path="/"
                    element={
                        <Navigate
                            to="/dashboard"
                            replace
                        />
                    }
                /> */}
                <Route
                    path="/login"
                    element={<Login/>}
                />
                <Route
                    path="/register"
                    element={<Register/>}
                />
                {/* <Route element={<AppLayout/>}>
                    <Route
                        path="/dashboard"
                        element={<Dashboard/>}
                    />
                    <Route
                        path="/todos"
                        element={<Todos/>}
                    />
                    <Route
                        path="/profile"
                        element={<Profile/>}
                    />
                    <Route
                        path="/settings"
                        element={<Settings/>}
                    />
                </Route> */}
                <Route element={<ProtectedRoute/>}>
                    <Route
                        path="/"
                        element={<Dashboard/>}
                    />
                </Route>
                
            </Routes>
        </BrowserRouter>
    )
}