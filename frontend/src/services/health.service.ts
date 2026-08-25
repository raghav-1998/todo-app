import api from "./api"

export type HealthResponse={
    success:boolean,
    message:string,
    data:{
        status:string
    }
}

export async function getHealth():Promise<HealthResponse>{
    const response=await api.get('/health');
    console.log(response)
    return response.data
}