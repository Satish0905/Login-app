"use client"
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
export default function login(){

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    function handleSubmit(event: { preventDefault: () => void; }){
        event.preventDefault();
        axios.post("http://localhost:8000/login",{email,password})
        .then(result=>console.log(result))
        .catch(err=>console.log(err))
    }

    return(
        <div className="d-flex justify-content-center aligin-items-center bg-primary">
                <div className="p-3 bg-white w-25">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label>Email:</label>
                            <input type="email" placeholder="Enter the email id" className="form-control"
                            onChange={e=> setEmail(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label>Password:</label>
                            <input type="password" placeholder="Enter the password" className="form-control"
                            onChange={e=> setPassword(e.target.value)}
                            />
                            <div>Forget Password?</div>
                        </div>
                        <button className="btn btn-success">Login</button>
                    </form>
                </div>
            </div>
    )

}
