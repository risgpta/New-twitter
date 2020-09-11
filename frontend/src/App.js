import React from 'react';
import './App.css';
import logo from './assets/twitter.svg'; 

function App() {
  return (
    <div className="App">
      <div className="AppInfo">
        <div className="Info"> New Twitter</div>
      </div>
      <div className="Sign">
        <img src={logo} alt="logo" style={{height:'200px', width:'200px'}}/>
      Join New Twitter today!
      <button className="signup">
        Sign Up
      </button>
      <button className="login">
        Login
      </button>
      </div>
    </div>
  );
}

export default App;
