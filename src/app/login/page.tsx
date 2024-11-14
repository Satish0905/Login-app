"use client"
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";
export default function login(){

    const router=useRouter();
    function loginhandler(){
        router.push("login");
    }
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    function handleSubmit(event: { preventDefault: () => void; }){
        event.preventDefault();
        axios.post("http://localhost:8000/login",{email,password})
        .then(result=>console.log(result))
        .catch(err=>console.log(err))
    }

    return(
        <div>
            <div className="a1">
                    <form>
                        <div>
                            <label>Email:</label>
                            <input type="email" placeholder="Enter the email id" className="form-control"
                            onChange={e=> setEmail(e.target.value)}/>
                        </div>
                        <div>
                            <label>Password:</label>
                            <input type="password" placeholder="Enter the password" className="form-control"
                            onChange={e=> setPassword(e.target.value)}
                            />
                            <div>Forget Password?</div>
                        </div>
                        <button className="btn btn-success">Login</button><br/><br/>
                    </form>
                </div>
        </div>
                
    )

}
