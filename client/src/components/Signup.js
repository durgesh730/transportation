import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-number-input";
import { useNavigate } from "react-router-dom";
import validator from 'validator';
import "react-phone-number-input/style.css";
import backimg from "../images/Logo.png";
import logo from "../images/Logo.png";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import generateOtp from 'rv-otp-generator';

const Login = () => {
    const navigate = useNavigate();
    const [phone, setPhone] = useState("+911234567890");
    const temp = []
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        Rpassword: "",
        type: ""
    });
    const [OTP,setOTP]=useState(true);
    const [newPass,setNewPass]=useState(false);

    const [getOtp, setGetOtp]=useState('');
    const [otp,setotp]=useState(0);

    const handleSignup = async (e) => {
        e.preventDefault();
        const { username, email, password, type, Rpassword } = values
        if (username === "") {
            toast("Please Enter the Name", {
                autoClose: 1000,
            })
        } else if (email === "") {
            toast("Please Enter the email", {
                autoClose: 1000,
            })
        } else if (password === "") {
            toast("Please Enter your password", {
                autoClose: 1000,
            })
        } else if (password.length < 4) {
            toast("Password must be 6 char", {
                autoClose: 1000,
            })
        } else if (Rpassword === '') {
            toast("Password must be 6 char", {
                autoClose: 1000,
            })
        } else if (password !== Rpassword) {
            toast("Password do not Match", {
                autoClose: 1000,
            })
        } else if (phone.length <= 12) {
            toast("Plz Enter correct phone number ", {
                autoClose: 1000,
            })
        } else {
            const data = await fetch(`http://localhost:5000/user/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password,
                    phone: phone,
                    type: type,
                })
            });
            const res = await data.json();
            if (res.status === 201) {
                localStorage.setItem("token", res.token);
                localStorage.setItem("user", JSON.stringify(res.user));
                localStorage.setItem("type", res.user.type);
                
                setOTP(false)
                const otp = generateOtp(4)
                setotp(otp);
                console.log(otp)
                temp.push({ "email": email, "otp": otp })
                console.log(temp)
                setGetOtp('');

                console.log("opt is ", getOtp)
                window.Email.send({
                    Host: "smtp.elasticemail.com",
                    Username: "anshu.verma62074@gmail.com",
                    Password: "B4B14856EDDCC0A25DAF23492E8D4A7E356B",
                    To: email,
                    From: "durgeshchaudhary020401@gmail.com",
                    Subject: "This is the otp to reset password for JOB HUNT",
                    Body: otp
                })
            }
            // if (localStorage.getItem("token")) {
            //     if (localStorage.getItem("type") === "user") {
            //         navigate("/user");
            //     }
            //     else if (localStorage.getItem("type") === "Driver") {
            //         navigate("/driver");
            //     } else if (localStorage.getItem("type") === "admin") {
            //         navigate("/admin");
            //     }
            // }
            // else { navigate("/"); }
        }
    };

    return (
        <>
            <div className="login-container row">
                <div className="left-side col-5">
                    <div className="top-left d-flex align-items-center">
                        <i onClick={() => { navigate("/"); }} className="fa-sharp fa-solid fa-arrow-left"></i>
                        <p className="px-3 m-0">Signup</p>
                    </div>
                    <img className="login-img w-100 " src={backimg} alt="" />
                    <div className="login-footer">
                        <div className="open-quote">???</div>
                        <div className="quote">
                            I???m a 21st century man. I don???t belive in magic. I belive in sweat, tears, life and death.
                        </div>
                        <div className="author">kamal haasan</div>
                        <div className="close-quote">???</div>
                        <div className="three-dots">
                            <i className="fa-solid fa-circle mx-1"></i>
                            <i className="fa-regular fa-circle mx-1"></i>
                            <i className="fa-regular fa-circle mx-1"></i>
                        </div>
                    </div>
                </div>
                <div className="right-side col-7 d-flex align-items-center justify-content-center">
                    {/* Signup Form */}
                    <form onSubmit={handleSignup} className="form-container" id="signup-form">
                        <div className=" logotext d-flex justify-content-center" style={{ alignItems: "center" }} >
                            <img src={logo} alt="" className="form-logo web1-logo" />
                            <span>Loadkro</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Enter Full Name"
                            className="form-control my-2"
                            label="Name"
                            onChange={(event) => {
                                setValues((prev) => ({ ...prev, username: event.target.value }));
                            }}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="form-control my-2"
                            label="Email"
                            onChange={(event) => {
                                setValues((prev) => ({ ...prev, email: event.target.value }));
                            }}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="form-control my-2"
                            label="Password"
                            onChange={(event) => {
                                setValues((prev) => ({ ...prev, password: event.target.value }));
                            }}
                        />
                        <input
                            type="password"
                            placeholder="Re-enter Password"
                            className="form-control my-2"
                            onChange={(event) => {
                                setValues((prev) => ({ ...prev, Rpassword: event.target.value }));
                            }}
                        />
                        <PhoneInput
                            className="form-control"
                            placeholder="Enter phone number"
                            value={phone}
                            onChange={setPhone}
                            defaultCountry=""
                        />
                        <div style={{ position: "relative", display: "flex" }}>
                            <select className="form-control my-2"
                                onChange={(event) => {
                                    setValues((prev) => ({ ...prev, type: event.target.value }));
                                }}
                            >
                                <option value="" selected >Type</option>
                                <option value="Driver" >Driver</option>
                                <option value="user">User</option>
                            </select>
                            <div
                                style={{
                                    position: "absolute",
                                    right: "15px",
                                    top: "0",
                                    bottom: "0",
                                    display: "flex",
                                    alignItems: "center",
                                    color: "lightgrey",
                                }}
                            >
                                <i className="fa-solid fa-chevron-down"></i>
                            </div>
                        </div>
                        <b>{''}</b>
                        <input type="submit" className="submit-btn btn btn-lg btn-block my-2" value="Signup" />

                        <div className="alternate-option my-3 text-center">
                            Already have an account{" "}
                            <a href="login">
                                <b>
                                    <u>Login</u>
                                </b>
                            </a>
                        </div>
                    </form>
                    <div id="recaptcha-container"></div>
                </div>
            </div>

            <ToastContainer />
        </>
    );
};

export default Login;
