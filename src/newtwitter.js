import React from 'react';
import SnackbarProvider from 'react-simple-snackbar';

import './App.css';
import logo from './assets/twitter.svg'; 

import Signup from './components/signup';
import Login from './components/login';

function Newtwitter() {

  return (
    <div className="App">
      <div className="AppInfo">
        <div className="Info"> New Twitter</div>
      </div>
      <div className="Sign">
        <img src={logo} alt="logo" style={{height:'180px', width:'180px'}}/>
      Join New Twitter today!
      <SnackbarProvider>
      <Signup/>
      <Login/>
      </SnackbarProvider>
      </div>
    </div>
  );
}

export default Newtwitter;