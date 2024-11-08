"use client"
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

export default function register(){
    const [firstname,setFirstname]=useState('')
    const [lastname,setLastname]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    function handleSubmit(event: { preventDefault: () => void; }){
        event.preventDefault();
        axios.post("http://localhost:8000/register",{firstname,lastname,email,password})
        .then(result=>console.log(result))
        .catch(err=>console.log(err))
    }

    return(
        <div className="d-flex justify-content-center aligin-items-center bg-primary">
                <div className="p-3 bg-white w-25">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label>First Name:</label>
                            <input type="firstname" placeholder="Enter the first name" className="form-control"
                            onChange={e=> setFirstname(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label>Last Name:</label>
                            <input type="lastname" placeholder="Enter the last name" className="form-control"
                            onChange={e=> setLastname(e.target.value)}/>
                        </div>
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
                        </div>
                        <div>By creating an account you agree to our <span className="term">Terms & Privacy.</span></div>
                        <br/>
                        <button className="btn btn-success">Create a New Account</button>
                    </form>
                </div>
            </div>
    )
}