import React, { Component , useCallback } from 'react';
import { useEffect , useState } from 'react'
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import { useNavigate } from "react-router-dom";



function Login({email , setemail}) {

    const [pass,setpass] = useState('');
    const navigate = useNavigate();

    const triggerAPI = useCallback(async () => {
        const res = await axios.post('/' , {email:email , password:pass});
        console.log(res);
        if(res.data["error"] == "Incorrect Password try again!"){
            alert("Incorrect Password try again!");
            navigate('./'); 
        }
        else if(res.data["error"] == "Email does not exist ,  Register first !"){
            alert("Email does not exist ,  Register first !");
            navigate('./signup');
        }
        else{
            navigate('./userpage')
        }
    },[email,pass]);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        triggerAPI();
        
    },[triggerAPI])

    const handleChangemail = useCallback((e) => {
        setemail(e.target.value)
    },[])

    const handleChangepass = useCallback((e) => {
        setpass(e.target.value)
    },[])

    return (
        <>
            <div className="screen-1">

                <div className="email">
                    <label htmlFor="email">Email Address</label>
                    <div className="sec-2">
                        <ion-icon name="mail-outline"></ion-icon>
                        <input type="email" name="email" value = {email} placeholder=" eg : Username@gmail.com" onChange={handleChangemail}/>
                    </div>
                </div>
                <div className="password">
                    <label htmlFor="password">Password</label>
                    <div className="sec-2">
                        <ion-icon name="lock-closed-outline"></ion-icon>
                        <input className="pas" type="password" name="password" value={pass} placeholder="············" onChange={handleChangepass}/>
                        <ion-icon className="show-hide" name="eye-outline"></ion-icon>
                    </div>
                </div>
                <button className="login" onClick={handleSubmit}>
                    Login
                </button>

                <li >
                    <Link to="/signup" className="link">signup</Link>
                </li>
                <li>
                    <Link to="/reset" className="link">Forget Password</Link>
                </li>

                {console.log(email)}

            </div>
        </>
    );
}
export default Login;