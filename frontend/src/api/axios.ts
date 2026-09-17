import axios, {type AxiosError,type InternalAxiosRequestConfig } from 'axios';
import { getAccessToken, setAccessToken, clearAccessToken, notifySessionExpired } from './token';
import { refreshAccesToken } from './auth.api';

interface RetryableRequest extends InternalAxiosRequestConfig{
    _retry?:boolean
}
const apiClient= axios.create({
    baseURL:import.meta.env.VITE_API_URL,
    withCredentials:true,
    headers:{
        "Content-Type":"application/json"
    }
})

//Axios get accessToken details
apiClient.interceptors.request.use(
    (config)=>{
        const accessToken=getAccessToken();

        if(accessToken){
            config.headers.Authorization=`Bearer ${accessToken}`
        }

        return config
    }
)

//Implementing Refresh Interceptor
let isRefreshing=false;
let refreshPromise:Promise<string>|null=null;

apiClient.interceptors.response.use(
    (response)=>{
        return response
    },
    async (error:AxiosError)=>{
        // const originalRequest=
        //     error.config as InternalAxiosRequestConfig &{
        //         _retry?:boolean
        //     }
        const originalRequest=
                error.config as RetryableRequest | undefined;
        
        if(!originalRequest){
            return Promise.reject(error)
        }

        const status=error.response?.status;

        // if(status!==401 || originalRequest._retry){
        //     return Promise.reject(error)
        // }

        //Only access-token failures should trigger the refresh flow.
        if(status!=401){
            return Promise.reject(error)
        }

        //Don't retry multiple request
        if(originalRequest._retry){
            return Promise.reject(error)
        }

         /*
         * Authentication endpoints should never trigger
         * another refresh request.
         */

        const requestUrl =
            originalRequest.url ?? "";

        const isAuthRequest =
            requestUrl.includes("/auth/login") ||
            requestUrl.includes("/auth/register") ||
            requestUrl.includes("/auth/refresh") ||
            requestUrl.includes("/auth/logout");

        if (isAuthRequest) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        try {
            // if (!isRefreshing) {
            if(!refreshPromise){
                // isRefreshing = true;

                refreshPromise =
                    refreshAccesToken()
                        .then((response) => {
                            const newAccessToken =
                                response.data.accessToken;

                            setAccessToken(
                                newAccessToken
                            );

                            return newAccessToken;
                        })
                        .finally(() => {
                            // isRefreshing = false;
                            refreshPromise = null;
                        });
            }
            const newAccessToken =
                await refreshPromise!;

            originalRequest.headers.Authorization =
                `Bearer ${newAccessToken}`;

            return apiClient(originalRequest);
        } catch (refreshError) {
            clearAccessToken();

            notifySessionExpired();
            return Promise.reject(
                refreshError
            );
        }

    }
)

export default apiClient