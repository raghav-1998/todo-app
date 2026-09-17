import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import type {FormEvent} from "react";
import axios from "axios";

export default function Login(){
    const navigate=useNavigate();
    const{login}=useAuth();

    // const [name, setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const [error,setError]=useState("");
    const [isSubmitting, setIsSubmitting]=useState(false);

    const handleSubmit=async(
        event:FormEvent<HTMLFormElement>
    )=>{
        event.preventDefault();

        setError("");
        setIsSubmitting(true);

        try {
            await login({
                email,
                password
            })

            navigate("/");
        } catch (error) {
            if(axios.isAxiosError(error)){
                setError(
                    error?.response?.data?.message ??"Login failed"
                );
            }else{
                setError("Something went wrong")
            }    
        } finally{
            setIsSubmitting(false)
        }
    }

    return(
        <div>
            <h1 className="text-2xl font-bold">
                Login
            </h1>

            <form action="" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="text"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        required
                    />
                </div>

                {error && (
                    <p>{error}</p>
                )}
                
                <button
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting
                        ?"Logging In ...."
                        :"Login"
                    }
                </button>

                <p>
                    Don't have an account?{" "}
                    <Link to="/register">
                        Register
                    </Link>
                </p>
            </form>
        </div>
    )
}