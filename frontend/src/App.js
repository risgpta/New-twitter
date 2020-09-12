import React,{useState,useEffect} from 'react';
import Modal from 'react-modal';

import './App.css';
import logo from './assets/twitter.svg'; 


function App() {
 
  const [signupIsOpen,setSignupOpen] = useState(false);
  const [loginIsOpen,setLoginOpen] = useState(false);

  const [signupdata,setSignupdata] = useState(null);
  const [logindata,setLogindata] = useState(null);

  const requestSignup = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(signupdata)
  };

  const requestLogin = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(logindata)
  };

  useEffect(() => {
    if(signupdata != null)
    {
      fetch('https://twitter-clone-mukul.herokuapp.com/users/register/',requestSignup)
      .then(response => {
        console.log(response);
        const responseJson = response.json();
        console.log(responseJson);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
    }

    if(logindata != null)
    {
      fetch('https://twitter-clone-mukul.herokuapp.com/users/login/',requestLogin)
      .then(response => {
        console.log(response);
        if(response.status === 200)
        {
          window.location.href = "https://twitter.com/";
        }
        const responseJson = response.json();
        console.log(responseJson);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
    }

  },[logindata,signupdata])

  function openSignup() {
    setSignupOpen(true);
  }

  function closeSignup(){
    setSignupOpen(false);
  }

  function openLogin() {
    setLoginOpen(true);
  }

  function closeLogin(){
    setLoginOpen(false);
  }

  function handleSignupSubmit(e){
    e.preventDefault();
    let values = document.getElementById('signup');
    let inputs = values.querySelectorAll("input");
    let userinfo = {};
    for(let data of inputs)
    {
      userinfo[data.name] = data.value;
    }
    console.log(userinfo);
    setSignupdata(userinfo);
    closeSignup();
  }

  function handleLoginSubmit(e){
    e.preventDefault();
    let values = document.getElementById('login');
    let inputs = values.querySelectorAll("input");
    let userinfo = {};
    for(let data of inputs)
    {
      userinfo[data.name] = data.value;
    }
    console.log(userinfo);
    setLogindata(userinfo);
  }

  return (
    <div className="App">
      <div className="AppInfo">
        <div className="Info"> New Twitter</div>
      </div>
      <div className="Sign">
        <img src={logo} alt="logo" style={{height:'180px', width:'180px'}}/>
      Join New Twitter today!
      <button onClick={openSignup} className="signup">
        Sign Up
      </button>
      <button onClick={openLogin} className="login">
        Login
      </button>
      </div>
      <Modal
          isOpen={signupIsOpen}
          onRequestClose={closeSignup}
          className="modalStyle"
          ariaHideApp={false}
        >
           <img src={logo} alt="logo" style={{height:'30px', width:'30px', display:'block', margin:'auto',marginTop:'20px'}}/>
          <form id="signup" className="formStyle" >
            <label>First Name</label>
            <input name="first_name" type="text" />
            <label>Last Name</label>
            <input name="last_name" type="text" />
            <label>Username</label>
            <input name="username" type="text" />
            <label>Email</label>
            <input name="email" type="email" />
            <label>Password</label>
            <input name="password" type="password" />
            <button onClick={e => handleSignupSubmit(e)} className="smallbtn">
              submit
            </button>
          </form>
        </Modal>
        <Modal
          isOpen={loginIsOpen}
          onRequestClose={closeLogin}
          className="modalStyle"
          ariaHideApp={false}
        >
           <img src={logo} alt="logo" style={{height:'30px', width:'30px', display:'block', margin:'auto',marginTop:'20px'}}/>
          <form id="login" className="formStyle" method="POST">
            <label>Username</label>
            <input name="username" type="text" />
            <label>Password</label>
            <input name="password" type="text" />
            <button onClick={e => handleLoginSubmit(e)} className="smallbtn">
              login
            </button>
          </form>
        </Modal>
    </div>
  );
}

export default App;