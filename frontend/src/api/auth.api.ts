import type { AuthResponse, LoginRequest, MeResponse, RegisterRequest } from "../types/auth";
import apiClient from "./axios";

const registerUser=async(
    data:RegisterRequest
):Promise<AuthResponse>=>{
    const response=await apiClient.post<AuthResponse>(
        '/auth/register',
        data
    )

    return response.data
}

const loginUser=async(
    data:LoginRequest
):Promise<AuthResponse>=>{
    const response=await apiClient.post<AuthResponse>(
        "/auth/login",
        data
    )

    return response.data
}


const logoutUser=async():Promise<void>=>{
    await apiClient.post("/auth/logout")
}

const refreshAccesToken=async():Promise<AuthResponse>=>{
    const response=await apiClient.post<AuthResponse>(
        "/auth/refresh",
    );

    return response.data
}

const getCurrentUser=async():Promise<MeResponse>=>{
    const response=await apiClient.get<MeResponse>("/auth/me");
    return response.data
}
export{
    registerUser,
    loginUser,
    logoutUser,
    refreshAccesToken,
    getCurrentUser
}