import React, { Component , useCallback } from 'react';
import { useEffect , useState } from 'react'
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css'
import Login from './login' ; 
import { useNavigate } from "react-router-dom";

console.log("am i reaching here ? ") 


function Signup({email,setemail}) {
;
    const [fname,setfname] = useState('');
    const [lname,setlname] = useState('');
    const [pass1,setpass1] = useState('');
    const [pass2,setpass2] = useState('');

    const navigate = useNavigate();

    const triggerAPI = useCallback(async () => {
        const res = await axios.post('/signup' , {email:email , password:pass1 , fname : fname , lname : lname , password2:pass2});
        console.log("here res = ");
        console.log(res);

        if (res.data["error"]==" Email is already taken!!"){
            alert("Email is already taken")
            window.location.reload(false);
        }
        else if (res.data["error"] == " Account Successfully Created"){
            alert("Account successfully created");
            navigate('/userpage')
        }

    },[email,pass1,fname,lname,pass2]);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        console.log(pass1)
        console.log(pass2)
        console.log(" here e is equal to ");
        console.log(e);
        triggerAPI();
        
    },[triggerAPI])


    const handleChangemail = useCallback((e) => {
        setemail(e.target.value)
    },[])

    const handleChangefname = useCallback((e) => {
        setfname(e.target.value)
    },[])

    const handleChangelname = useCallback((e) => {
        setlname(e.target.value)
    },[])

    const handleChangepass1 = useCallback((e) => {
        setpass1(e.target.value)
    },[])

    const handleChangepass2 = useCallback((e) => {
        setpass2(e.target.value)
    },[])

    


    return (
        <>
            <div className="screen-1">
                <div className="email">
                    <label htmlFor="email">Email Address</label>
                    <div className="sec-2">
                        <ion-icon name="mail-outline"></ion-icon>
                        <input type="email" name="email" id="email" placeholder=" eg : Username@gmail.com" value = {email} onChange={handleChangemail}/>
                    </div>
                </div>
                <div className="name">
                    <label htmlFor="name">First Name</label>
                    <div className="sec-2">
                        <ion-icon name="lock-closed-outline"></ion-icon>
                        <input className="pas" type="text" name="fname" id="fname" placeholder=" eg :Kishore" value = {fname} onChange={handleChangefname}/>
                        <ion-icon className="show-hide" name="eye-outline"></ion-icon>
                    </div>
                </div>
                <div className="name">
                    <label htmlFor="name">Last Name</label>
                    <div className="sec-2">
                        <ion-icon name="lock-closed-outline"></ion-icon>
                        <input className="pas" type="text" name="lname" id="lname" placeholder=" eg :Kumar" value = {lname} onChange={handleChangelname}/>
                        <ion-icon className="show-hide" name="eye-outline"></ion-icon>
                    </div>
                </div>
                <div className="password">
                    <label htmlFor="password">Password</label>
                    <div className="sec-2">
                        <ion-icon name="lock-closed-outline"></ion-icon>
                        <input className="pas" type="password" name="password" id="password" placeholder="············" value = {pass1} onChange={handleChangepass1}/>
                        <ion-icon className="show-hide" name="eye-outline"></ion-icon>
                    </div>
                </div>
                <div className="password">
                    <label htmlFor="password">Repeat Password</label>
                    <div className="sec-2">
                        <ion-icon name="lock-closed-outline"></ion-icon>
                        <input className="pas" type="password" name="password2" id="password2" placeholder="············" value = {pass2} onChange={handleChangepass2}/>
                        <ion-icon className="show-hide" name="eye-outline"></ion-icon>
                    </div>
                </div>
                <div>
                    {pass1!==pass2 && <p>Passwords do not match , try again!</p>}
                </div>
                <button className="login" disabled = {pass1 !== pass2} onClick={handleSubmit}>
                    Create Account
                    <Link to="/userpage" className="link"></Link>
                </button>
                <div className="footer">
                    <li className="nav-item">
                        <Link to="/" className="Link">Already have an account</Link>
                    </li>
                </div>
            </div>
        </>
    );
}
export default Signup;