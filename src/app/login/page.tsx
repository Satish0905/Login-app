    "use client"
    import React from "react";
    import "bootstrap/dist/css/bootstrap.min.css";
    import axios from "axios";
    import { useRouter } from "next/navigation";
    import { useFormik } from "formik";

    interface userParams{
        email?:string,
        password?:string
    }

    export default function Login() {

        const router = useRouter();
        const userDetails={name:"hari"}


        const validate= (values:userParams)=>{
            const errors:userParams={}
            if (!values.email) {
                errors.email = "Email is required";
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = "Invalid email address";
            }
            if (!values.password) {
                errors.password = "Password is required";
            } else if (values.password.length < 6) {
                errors.password = "Password must be at least 6 characters";
            }

            return errors; 
        }
        const formik = useFormik({
            initialValues: {
                email: '',
                password: ''
            },
            validate,
            onSubmit: (values) => {
                axios.post("http://localhost:8000/login", values)
                    .then(result => {
                        console.log(result);
                        router.push('/?name=John%20Doe&age=25'); 
                    })
                    .catch(err => console.log(err));
            }
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
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />
                            {formik.touched.email && formik.errors.email ? (
                            <div className="text-danger">{formik.errors.email}</div>
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
                            <div>Forget Password?</div>
                        </div>
                        <button type="submit" className="btn btn-success">Login</button><br/><br/>
                    </form>
                </div>
            </div>
        );
    }
