export interface User{
    id:string,
    name:string,
    email:string
}

export interface RegisterRequest{
    name:string,
    email:string,
    password:string
}

export interface LoginRequest{
    email:string,
    password:string
}

export interface AuthResponseData{
    user:User,
    accessToken:string,
}

export interface AuthResponse{
    success:boolean,
    message:string,
    data:AuthResponseData
}

export interface MeResponse{
    success:boolean,
    message:string,
    data:{
        user:User
    }
}

// export{
//     RegisterRequest
// }