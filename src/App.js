
import React, { Component } from 'react';
import { useState } from 'react'
import axios from "axios";
import './App.css';
import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signup from './signup';
import Reset from './reset';
import Login from './login';
import User from './userpage';





function App() {

  const [email, setemail] = useState('')

  return (
    <>
      <Router>
        <Routes>
          {/* <Route path="/">
            <Login
              email={email}
              setemail={setemail}
            />
          </Route> */}
          <Route exact path="/" element={< Login email={email} setemail={setemail}/>}></Route>
          <Route exact path="/signup" element={< Signup email={email} setemail={setemail}/>}></Route>
          <Route exact path="/reset" element={< Reset />}></Route>
          <Route exact path="/userpage" element={< User email={email}/>}></Route>
        </Routes>
      </Router>

    </>
  );
}

export default App;