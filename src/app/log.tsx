"use client"
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function Login(){

    const router=useRouter();

    const params=useSearchParams();

    const [userName,setUserName]=useState(params.get("name"));

    function loginhandler(){
        router.push("login");
    }
    function registerhanler(){
        router.push("register");
    }
    function logouthandler(){
       setUserName(null);
       router.push("/");
    }

    return(
        <div className="a1">
            <div>
               <button className="btn btn-success" onClick={registerhanler}>Registration Form</button><br/><br/>
               {
                !userName&&<button className="btn btn-success" onClick={loginhandler}>Login</button>
               }
               {
                userName&&<button className="btn btn-success" onClick={logouthandler}>Logout</button>
               }
            </div>
        </div>
    )
}
