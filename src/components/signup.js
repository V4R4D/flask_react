import React, { Component , useCallback } from 'react';
import { useEffect , useState } from 'react'
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import './../App.css'
import Login from './login' ; 
import { useNavigate } from "react-router-dom";
import {validEmail , validPass , validName} from './validations.js';


function Signup({email,setemail}) {
;
    const [fname,setfname] = useState('');
    const [lname,setlname] = useState('');
    const [pass1,setpass1] = useState('');
    const [pass2,setpass2] = useState('');
    const [valid,setValid] = useState(false);

    const [emailerror , setEmailError] = useState(false);
    const [passerror , setPassError] = useState(false);
    const [nameerror,setNameError] = useState(false);

    const navigate = useNavigate();

    const validatename = () => {
        var txts = document.querySelectorAll("input[type='text']");
        var check = true;
        for(var i = 0;i<txts.length;i++){
            console.log(txts[i]);
            var name = txts[i].value;
            console.log(name);
            if(!validName.test(txts[i].value) || (txts[i].value).length < 1){
                check = false;
                txts[i].parentNode.classList.add('invalid');
            }
            else{
                txts[i].parentNode.classList.remove('invalid');
            }
        }
        setValid(check);
        return check;
    }

    const validateemail = () => {
        var txts = document.querySelectorAll("input[type='email']");
        var check = true;
        for(var i = 0;i<txts.length;i++){
            console.log(txts[i]);
            var name = txts[i].value;
            console.log(name);
            if(!validEmail.test(txts[i].value) || (txts[i].value).length < 1){
                console.log("HERE");
                console.log(name);
                console.log(txts[i].value);
                check = false;
                txts[i].parentNode.classList.add('invalid');
            }
            else{
                txts[i].parentNode.classList.remove('invalid');
            }
        }
        setValid(check);
        return check;
    }

    const validatePassword = () =>{
        var txts = document.querySelectorAll("input[type='password'][name='password']");
        var check = true;
        for(var i = 0;i<txts.length;i++){
            console.log(txts[i]);
            var name = txts[i].value;
            console.log(name);
            if(!validPass.test(txts[i].value) || (txts[i].value).length < 1){
                check = false;
                console.log(" show " , txts[i].value);
                txts[i].parentNode.classList.add('invalid');
            }
            else{
                txts[i].parentNode.classList.remove('invalid');
            }
        }
        setValid(check);
        return check;
    }

    const triggerAPI = useCallback(async () => {
        const res = await axios.post('/signup' , {email:email , password:pass1 , fname : fname , lname : lname , password2:pass2});
        console.log("here res = ");
        console.log(res); 

        if (res.data["error"]==" Email is already taken!!"){
            alert("Email is already taken")
            window.location.reload(false);
        }
        else if (res.data["success"] == " Account Successfully Created"){
            alert("Account successfully created");
            navigate('/userpage')
        }

    },[email,pass1,fname,lname,pass2]);

    const handleSubmit = useCallback((e) => {
        if(validatePassword() && validateemail() && validatename()){
            console.log(" is this getting validated ?");
            e.preventDefault();
            console.log(pass1)
            console.log(pass2)
            console.log(" here e is equal to ");
            console.log(e);
            triggerAPI();
        }
        else{
            setValid(false);
        }
        
        
    },[triggerAPI])


    const handleChangemail = useCallback((e) => {
        console.log(e.target.value);
        validateemail();
        console.log(" state is valid=",valid);
        if(!validEmail.test(e.target.value)){
            setEmailError(true);
        }
        else{
            setEmailError(false);
        }
        setemail(e.target.value)
    },[])

    const handleChangefname = useCallback((e) => {
        validatename();
        if(!validName.test(e.target.value)){
            setNameError(true);
        }
        else{
            setNameError(false);
        }
        setfname(e.target.value);
    },[])


    const handleChangepass1 = useCallback((e) => {
        validatePassword();
        if(!validPass.test(e.target.value)){
            setPassError(true);
        }
        else{
            setPassError(false);
        }
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
                    <label htmlFor="name">Full Name</label>
                    <div className="sec-2">
                        <ion-icon name="lock-closed-outline"></ion-icon>
                        <input className="pas" type="text" name="fname" id="fname" placeholder=" eg :Kishore" value = {fname} onChange={handleChangefname}/>
                        <ion-icon className="show-hide" name="eye-outline"></ion-icon>
                    </div>
                </div>
                {/* <div>
                    {nameerror && <><p>Field required.</p><p> Make sure your name contains only Alphabets.</p> </>}
                </div> */}
                {/* <div className="name">
                    <label htmlFor="name">Last Name</label>
                    <div className="sec-2">
                        <ion-icon name="lock-closed-outline"></ion-icon>
                        <input className="pas" type="text" name="lname" id="lname" placeholder=" eg :Kumar" value = {lname} onChange={handleChangelname}/>
                        <ion-icon className="show-hide" name="eye-outline"></ion-icon>
                    </div>
                </div> */}
                
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
                <button className="login" disabled = {pass1 !== pass2 || !valid} onClick={handleSubmit}>
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