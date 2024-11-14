"use client"
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";

export default function Login() {

    const router = useRouter();
    const userDetails={name:"hari"}
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: (values) => {
            axios.post("http://localhost:8000/login", values)
                .then(result => {
                    console.log(result);
                    router.push('/?name=John%20Doe&age=25'); 
                })
                .catch(err => console.log(err));
        },
    });

    return (
        <div>
            <div className="a1">
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter the email id"
                            className="form-control"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter the password"
                            className="form-control"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                        <div>Forget Password?</div>
                    </div>
                    <button type="submit" className="btn btn-success">Login</button><br/><br/>
                </form>
            </div>
        </div>
    );
}
