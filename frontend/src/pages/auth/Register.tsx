import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import type {FormEvent} from "react";
import axios from "axios";

export default function Register(){
    const navigate=useNavigate();
    const{register}=useAuth();

    const [name, setName]=useState("");
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
            await register({
                name,
                email,
                password
            })

            navigate("/");
        } catch (error) {
            if(axios.isAxiosError(error)){
                setError(
                    error?.response?.data?.message ??"Registration failed"
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
            {/* <h1 className="text-2xl font-bold">
                Register
            </h1> */}

            <h1>Create Account</h1>

            <form action="" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">
                        Name
                    </label>

                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        required
                    />
                </div>

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
                        ?"Creating Account"
                        :"Register"
                    }
                </button>
            </form>

            <p>
                Already have an account?{" "}
                <Link to="/login">
                    Login
                </Link>
            </p>
        </div>
    )
}