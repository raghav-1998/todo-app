import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { LoginRequest, RegisterRequest, User } from "../types/auth";
import { getCurrentUser, loginUser, logoutUser, refreshAccesToken, registerUser } from "../api/auth.api";
import { clearAccessToken, setAccessToken as setApiAccessToken, setSessionExpiredHandler } from "../api/token";
interface AuthContextValue{
    user: User|null;
    accessToken:string|null;
    isLoading:boolean;
    isAuthenticated:boolean;

    register:(data:RegisterRequest)=>Promise<void>;
    login:(data:LoginRequest)=>Promise<void>;
    logout:()=>Promise<void>;
}

const AuthContext=createContext<AuthContextValue|undefined>(undefined);

interface AuthProviderProps{
    children:ReactNode;
}

export function AuthProvider({
    children,
}:AuthProviderProps){
    const[user, setUser]=useState<User|null>(null)
    const[accessToken, setAccessToken]=useState<string|null>(null);
    const[isLoading, setIsLoading]=useState(true);
    const isAuthenticated=user!==null && accessToken!==null;

    //TODO: Later
    useEffect(()=>{
        const handleSessionExpired=()=>{
            setUser(null);
            setAccessToken(null);
            clearAccessToken();
        }
        setSessionExpiredHandler(handleSessionExpired);

        const restoreSession=async()=>{
            try {
                const refreshResponse=await refreshAccesToken();
                const newAccessToken=refreshResponse.data.accessToken
                
                setAccessToken(newAccessToken);
                setApiAccessToken(newAccessToken);

                const meResponse=await getCurrentUser();
                setUser(meResponse.data.user)
            } catch (error) {
                setUser(null)
                setAccessToken(null)
                clearAccessToken()
            }finally{
                setIsLoading(false)
            }
        };
        restoreSession();

        //removes the callback when AuthProvider unmounts.
        return()=>{
            setSessionExpiredHandler(null)
        };
    }, [])

    const register=async(
        data:RegisterRequest
    ):Promise<void>=>{
        const response=await registerUser(data);

        setUser(response.data.user)
    }

    const login=async(
        data:LoginRequest
    ):Promise<void>=>{
        try {
            const response=await loginUser(data);
            setAccessToken(response.data.accessToken);
            setUser(response.data.user)

            //Used by axios to create new access token
            setApiAccessToken(response.data.accessToken)

        } finally{
            setIsLoading(false)
        }       
    }

    const logout=async():Promise<void>=>{
        setIsLoading(true)
        try {
            await logoutUser()
        } finally{
            setUser(null)
            setAccessToken(null);
            clearAccessToken()
            setIsLoading(false)
        }
    }
    return(
        <AuthContext.Provider
            value={{
                user,
                accessToken,
                isLoading,
                isAuthenticated,
                register,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}


export function useAuth():AuthContextValue{
    const context=useContext(AuthContext)

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider"
        );
    }

    return context;

}

