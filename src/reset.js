import React from 'react';
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'

function Reset() {


    return (
        <div className="screen-1">
            <div className="email">
                <label for="email">Enter your Email Address here</label>
                <div className="sec-2">
                    <ion-icon name="mail-outline"></ion-icon>
                    <input type="email" name="email" placeholder=" eg : Username@gmail.com" />
                </div>
            </div>
            <p>Password reset link will be sent to this address if registered . </p>
            <button className="login"> Submit </button>
            <div className="footer">
                <li className="nav-item">
                    <a className="nav-link" href="/signup">Signup</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/">Already have an account</a>
                </li>
            </div>
        </div>
    );
}

export default Reset ;