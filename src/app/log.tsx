"use client"
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login(){

    const router=useRouter();
    function loginhandler(){
        router.push("login");
    }
    function registerhanler(){
        router.push("register");
    }

    return(
        <div className="a1">
            <div>
            <button className="btn btn-success" onClick={registerhanler}>Registration Form</button><br/><br/>
            <button className="btn btn-success" onClick={loginhandler}>Login</button>
        </div>
        </div>
    )
}
