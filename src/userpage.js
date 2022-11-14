import React, { Component , useCallback } from 'react';
import { useEffect , useState } from 'react'
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'

function User({email}) {

    const [type,settype] = useState('');
    const [salary , setsalary] = useState('');

    const triggerAPI = useCallback(async () => {
        console.log(" am i reaching here ? lugit ")
        const res = await axios.post('/userpage' , {type:type , salary:salary,email:email});
        console.log(res)
    },[type,salary,email]);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        triggerAPI();
    },[triggerAPI])

    const handleChangetype = useCallback((e) => {
        settype(e.target.value)
    },[])

    const handleChangesalary = useCallback((e) => {
        setsalary(e.target.value)
    },[])

    

    return (
        <>
            <h2> Welcome !</h2>
            <p> Email : {email} </p>
            <div className="screen-1">
                <select className="form-select" aria-label="Default select example">
                    <option value={type} onChange={handleChangetype} defaultValue>Select your type of employment</option>
                    <option value = "intern">Intern</option>
                    <option value = "FTE">FTE</option>
                </select>
                <div className="input-group mb-3">
                    <span className="input-group-text">₹</span>
                    <span className="input-group-text">0.00</span>
                    <input type="text" className="form-control" aria-label="Rupee amount (with dot and two decimal places)" value={salary} onChange={handleChangesalary}/>
                </div>
                <button className="login" onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        </>
    );
}
export default User ; 