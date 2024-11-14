"use client"
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useFormik } from "formik";

export default function Register() {

    const formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            email: '',
            mobilenumbercode: '',
            mobilenumber: '',
            password: '',
        },
        onSubmit: (values) => {
            axios.post("http://localhost:8000/register", values)
                .then(result => console.log(result))
                .catch(err => console.log(err));
        },
    });

    return (
        <div className="a1">
            <div>
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <label>First Name:</label>
                        <input
                            type="text"
                            name="firstname"
                            placeholder="Enter the first name"
                            className="form-control"
                            onChange={formik.handleChange}
                            value={formik.values.firstname}
                        />
                    </div>
                    <div>
                        <label>Last Name:</label>
                        <input
                            type="text"
                            name="lastname"
                            placeholder="Enter the last name"
                            className="form-control"
                            onChange={formik.handleChange}
                            value={formik.values.lastname}
                        />
                    </div>
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
                        <label>Mobile Number Code:</label>
                        <input
                            type="text"
                            name="mobilenumbercode"
                            placeholder="Enter the mobile number code"
                            className="form-control"
                            onChange={formik.handleChange}
                            value={formik.values.mobilenumbercode}
                        />
                    </div>
                    <div>
                        <label>Mobile Number:</label>
                        <input
                            type="text"
                            name="mobilenumber"
                            placeholder="Enter the mobile number"
                            className="form-control"
                            onChange={formik.handleChange}
                            value={formik.values.mobilenumber}
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
                    </div>
                    <div>By creating an account you agree to our Terms & Privacy.</div>
                    <br />
                    <button type="submit" className="btn btn-success">Create a New Account</button>
                </form>
            </div>
        </div>
    );
}
