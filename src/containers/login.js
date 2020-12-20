import React,{useState,useEffect} from 'react';
import Modal from 'react-modal';
import {Link} from 'react-router-dom';

import { connect } from 'react-redux';
import {login,gotInfo} from '../actions/loginAction';

import '../App.css';
import logo from '../assets/twitter.svg'; 
import Loader from '../components/loader';


function Login(props) {
  const [loginIsOpen,setLoginOpen] = useState(false);
  const [logindata,setLogindata] = useState(null);

  function openLogin() {
    setLoginOpen(true);
  }

  function closeLogin(){
    setLoginOpen(false);
  }

  useEffect(() => {
    if(logindata != null)
    {
      props.login(logindata);
      closeLogin();
    }
  },[logindata])

  useEffect(() => {
    if(props.data)
    {
      if(props.success === -1)
      {
        console.log('something went wrong...');
      }
      else
      {
        console.log('storing info...')
      }
    }
  },[props.Loading]);

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
      <button onClick={openLogin} className="login">
        Login
      </button>
        <Modal
          isOpen={loginIsOpen}
          onRequestClose={closeLogin}
          className="modalStyle"
          ariaHideApp={false}
        >
          {props.Loading ? <Loader/> :
          <div className="basediv">
           <img src={logo} alt="logo" style={{height:'30px', width:'30px', display:'block', margin:'auto',marginTop:'20px'}}/>
          <form id="login" className="formStyle" method="POST">
            <label>Username</label>
            <input name="username" type="text" />
            <label>Password</label>
            <input name="password" type="password" />
            <button onClick={e => handleLoginSubmit(e)} className="smallbtn">
              login
            </button>
          </form>
          </div>
          }
        </Modal>
    </div>
  );
}

const mapStateToProps = (state) => ({
  data : state.loginReducer.data,
  Loading : state.loginReducer.isLoading,  
  success : state.loginReducer.done,
})

const mapDispatchToProps = (dispatch) => {
  return {
    login: (payload) => dispatch(login(payload)),
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Login);