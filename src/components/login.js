import React,{useState,useEffect} from 'react';
import Modal from 'react-modal';
import { Redirect } from 'react-router';
import { useSnackbar } from 'react-simple-snackbar';
import {Link} from 'react-router-dom';
import { useCookies } from 'react-cookie';

import '../App.css';
import logo from '../assets/twitter.svg'; 

function Login() {
  const [cookies, setCookie] = useCookies();

 const options = {
  position: 'bottom-right',
  style: {
    backgroundColor: '#336600',
    border: '2px solid #408000',
    color: 'white',
    fontSize: '20px',
    textAlign: 'center',
    borderRadius: '5px',
  },
  closeStyle: {
    color: 'white',
    fontSize: '16px',
  },
}

const optionsError = {
    position: 'bottom-right',
    style: {
      backgroundColor: '#cc3300',
      border: '2px solid #e63900',
      color: 'white',
      fontSize: '20px',
      textAlign: 'center',
      borderRadius: '5px',
    },
    closeStyle: {
      color: 'white',
      fontSize: '16px',
    },
  }

  const [openSnackbar, closeSnackbar] = useSnackbar(options);
  const [openErrSnackbar, closeErrSnackbar] = useSnackbar(optionsError);

  const [loggedIn,SetLoggedIn] = useState(false);

  const [loginIsOpen,setLoginOpen] = useState(false);
  const [logindata,setLogindata] = useState(null);

  const requestLogin = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(logindata)
  };

  useEffect(() => {
    if(logindata != null)
    {
      fetch('https://twitter-clone-mukul.herokuapp.com/users/login/',requestLogin)
      .then(response => {
        console.log(response);
        const responseJson = response.json().then(data => {
        console.log(data); 
        if(response.status === 200)
        {
            openSnackbar('Logged In successfully');
            setCookie('Token', data.token, { path: '/' });
            setTimeout(() => SetLoggedIn(true),1000);
        }
        else
        {
            let res = '';
            for(let key in data)
            {
                res=res+key+','+data[key]+'.';
            }
            openErrSnackbar(res);
        }
      })   
      })
      .catch(error => {
        const responseJson = error.json().then(data => {
            console.log(data);
            let res = '';
            for(let key in data)
            {
                res=res+key+','+data[key]+'.';
            }
            openErrSnackbar(res);
            console.error('There was an error!', data);
          })
      });
    }

  },[logindata,loggedIn])

  function openLogin() {
    setLoginOpen(true);
  }

  function closeLogin(){
    setLoginOpen(false);
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

  if(loggedIn || cookies.Token)
  return <Redirect to='/home'/>
  else
  return (
    <div className="App">
      <button onClick={openLogin} className="login">
        Login
      </button>
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

export default Login;