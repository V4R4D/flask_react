import React, { Component, useCallback } from 'react';
import { useEffect, useState } from 'react'
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import './../App.css'
import { useNavigate } from "react-router-dom";
import { render } from 'react-dom';
import FlashMessage from 'react-flash-message';

function User({ email }) {
    const navigate = useNavigate();

    console.log(" email is ", email);
    console.log(typeof (email), email.length);




    const [type, settype] = useState('');
    const [salary, setsalary] = useState('');

    const triggerAPI = useCallback(async () => {
        console.log(" am i reaching here ? ")
        const res = await axios.post('/userpage', { type: type, salary: salary, email: email });
        console.log(res)
    }, [type, salary, email]);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        triggerAPI();
        alert("Details recorded !!");
    }, [triggerAPI])

    const handleChangetype = useCallback((e) => {
        console.log("am i reaching here type=", e.target.value);
        settype(e.target.value);
    }, [])

    const handleChangesalary = useCallback((e) => {
        setsalary(e.target.value)
    }, [])

    const goToLogin = useCallback(() => {
        navigate('./../');
    }, [])

    if (email == "") {
        console.log("User needs to login first!");
        return (
            <>
                <p> User not logged in !</p>
                <button className="login" onClick={goToLogin}>
                    Go to Login Page
                </button>

            </>
        );
    }


    return (
        <>
            <FlashMessage duration={5000}>
                <strong>I will disapper in 5 seconds!</strong>
            </FlashMessage>
            <h2> Welcome !</h2>

            <p> Email : {email} </p>
            <div className="screen-1">
                <select className="form-select" id="type" name='type' value={type} onChange={handleChangetype} aria-label="Default select example">
                    {/* <option  >Select your type of employment</option> */}
                    <option value="" disabled={true}></option>
                    <option value="Intern" >Intern</option>
                    <option value="FTE" >FTE</option>
                </select>
                <p>{`You selected ${type}`}</p>
                <div className="input-group mb-3">
                    <span className="input-group-text">₹</span>
                    <span className="input-group-text">0.00</span>
                    <input type="text" className="form-control" aria-label="Rupee amount (with dot and two decimal places)" value={salary} onChange={handleChangesalary} />
                </div>
                <button className="login" onClick={handleSubmit}>
                    Submit
                </button>
                <button className="login" onClick={() => {
                    navigate('./../');
                }}>
                    Logout
                </button>
            </div>
        </>
    );
}
export default User; 