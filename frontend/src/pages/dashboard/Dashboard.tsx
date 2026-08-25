import { useEffect, useState } from "react"
import { getHealth, type HealthResponse } from "../../services/health.service"
import Spinner from "../../components/common/Spinner";
import ErrorMessage from "../../components/common/ErrorMessage";

export default function Dashboard(){
    const[health,setHealth]=useState<HealthResponse|null>(null)
    const[isLoading, setIsLoading]=useState(true)
    const[isError, setIsError]=useState(false);

    useEffect(()=>{
        let isMounted=true;

        const fetchHealth=async()=>{
            try {
                setIsLoading(true)
                setIsError(false)

                const data=await getHealth();

                if(isMounted){
                    setHealth(data)
                }
            } catch (error) {
                if(isMounted){
                    setIsError(true)
                }
            } finally{
                if(isMounted){
                    setIsLoading(false)
                }
            }
        };

        fetchHealth();

        return ()=>{
            isMounted=false
        }
    }, [])

    

    return(
        // <div>
        //     <h1 className="text-2xl font-bold">
        //         Dashboard
        //     </h1>
        // </div>
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

            {isLoading && <Spinner/>}

            {isError && <ErrorMessage message="Server unavailable"/>}

            {!isLoading && !isError && health && (
                <div className="space-y-2">
                <p className="font-semibold">
                    Status: {health.data?.status || "Unknown"}
                </p>
                <p>{health.message}</p>
                </div>
            )}
        </div>
    )
}