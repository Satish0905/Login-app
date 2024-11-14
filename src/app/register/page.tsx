"use client"
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

export default function register(){
    const [firstname,setFirstname]=useState('')
    const [lastname,setLastname]=useState('')
    const [email,setEmail]=useState('')
    const [mobilenumbercode,setMobilenumbercode]=useState('')
    const [mobilenumber,setMobilenumber]=useState('')
    const [password,setPassword]=useState('')
    function handleSubmit(event: { preventDefault: () => void; }){
        event.preventDefault();
        axios.post("http://localhost:8000/register",{firstname,lastname,email,mobilenumbercode,mobilenumber,password})
        .then(result=>console.log(result))
        .catch(err=>console.log(err))
    }

    return(
        <div className="a1">
                <div>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>First Name:</label>
                            <input type="firstname" placeholder="Enter the first name" className="form-control"
                            onChange={e=> setFirstname(e.target.value)}/>
                        </div>
                        <div>
                            <label>Last Name:</label>
                            <input type="lastname" placeholder="Enter the last name" className="form-control"
                            onChange={e=> setLastname(e.target.value)}/>
                        </div>
                        <div>
                            <label>Email:</label>
                            <input type="email" placeholder="Enter the email id" className="form-control"
                            onChange={e=> setEmail(e.target.value)}/>
                        </div>
                        <div>
                            <label>Moblie Number Code:</label>
                            <input type="mobilenumbercode" placeholder="Enter the mobile number code" className="form-control"
                            onChange={e=> setMobilenumbercode(e.target.value)}/>
                        </div>
                        <div>
                            <label>Moblie Number:</label>
                            <input type="mobilenumber" placeholder="Enter the mobile number" className="form-control"
                            onChange={e=> setMobilenumber(e.target.value)}/>
                        </div>
                        <div>
                            <label>Password:</label>
                            <input type="password" placeholder="Enter the password" className="form-control"
                            onChange={e=> setPassword(e.target.value)}/>
                        </div>
                        <div>By creating an account you agree to our Terms & Privacy.</div>
                        <br/>
                        <button className="btn btn-success">Create a New Account</button>
                    </form>
                </div>
            </div>
    )
}