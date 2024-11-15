"use client"
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useFormik } from "formik";

interface userParams{
    firstname?:string,
    lastname?:string,
    email?:string,
    mobilenumbercode?:string,
    mobilenumber?:string,
    password?:String
}

export default function Register() {

        const validate = (values: userParams) => {
            const errors: Partial<userParams> = {};
        
            if (!values.firstname) {
                errors.firstname = "First name is required.";
            } else if (values.firstname.length < 2) {
                errors.firstname = "First name must be at least 2 characters long.";
            }
        
            if (!values.lastname) {
                errors.lastname = "Last name is required.";
            } else if (values.lastname.length < 2) {
                errors.lastname = "Last name must be at least 2 characters long.";
            }
        
            
            if (!values.email) {
                errors.email = "Email is required.";
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
                errors.email = "Invalid email format.";
            }
        
            
            if (!values.mobilenumbercode) {
                errors.mobilenumbercode = "Mobile number code is required.";
            } else if (!/^\+\d+$/.test(values.mobilenumbercode)) {
                errors.mobilenumbercode = "Mobile number code must start with '+' followed by digits.";
            }
        
            if (!values.mobilenumber) {
                errors.mobilenumber = "Mobile number is required.";
            } else if (!/^\d{10}$/.test(values.mobilenumber)) {
                errors.mobilenumber = "Mobile number must be 10 digits.";
            }
        
            if (!values.password) {
                errors.password = "Password is required.";
            } else if (values.password.length < 6) {
                errors.password = "Password must be at least 6 characters long.";
            }
        
            return errors;
        };

    const formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            email: '',
            mobilenumbercode: '',
            mobilenumber: '',
            password: '',
        },
        validate,
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
                            onBlur={formik.handleBlur}
                            value={formik.values.firstname}
                        />
                        {formik.touched.firstname && formik.errors.firstname ? (
                            <div className="text-danger">{formik.errors.firstname}</div>
                        ) : null}
                    </div>
                    <div>
                        <label>Last Name:</label>
                        <input
                            type="text"
                            name="lastname"
                            placeholder="Enter the last name"
                            className="form-control"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.lastname}
                        />
                        {formik.touched.lastname && formik.errors.lastname ? (
                            <div className="text-danger">{formik.errors.lastname}</div>
                        ) : null}
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter the email id"
                            className="form-control"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="text-danger">{formik.errors.email}</div>
                        ) : null}
                    </div>
                    <div>
                        <label>Mobile Number Code:</label>
                        <input
                            type="text"
                            name="mobilenumbercode"
                            placeholder="Enter the mobile number code"
                            className="form-control"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.mobilenumbercode}
                        />
                        {formik.touched.mobilenumbercode && formik.errors.mobilenumbercode ? (
                            <div className="text-danger">{formik.errors.mobilenumbercode}</div>
                        ) : null}
                    </div>
                    <div>
                        <label>Mobile Number:</label>
                        <input
                            type="text"
                            name="mobilenumber"
                            placeholder="Enter the mobile number"
                            className="form-control"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.mobilenumber}
                        />
                        {formik.touched.mobilenumber && formik.errors.mobilenumber ? (
                            <div className="text-danger">{formik.errors.mobilenumber}</div>
                        ) : null}
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter the password"
                            className="form-control"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div className="text-danger">{formik.errors.password}</div>
                        ) : null}
                    </div>
                    <div>By creating an account you agree to our Terms & Privacy.</div>
                    <br />
                    <button type="submit" className="btn btn-success">Create a New Account</button>
                </form>
            </div>
        </div>
    );
}
