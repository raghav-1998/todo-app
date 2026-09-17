import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute(){
    // const isAuthenticated=false;

    // if(!isAuthenticated){
    //     return (<Navigate to="/login" replace/>);
    // }

    const{isAuthenticated, isLoading}=useAuth();

    if(isLoading){
        return <div>Loading...</div>
    }

    if(!isAuthenticated){
        return <Navigate to="/login" replace/>
    }
    
    return <Outlet/>;
}