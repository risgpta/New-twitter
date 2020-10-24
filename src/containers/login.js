import React,{useState,useEffect} from 'react';
import Modal from 'react-modal';
import { Redirect } from 'react-router';
import { useSnackbar } from 'react-simple-snackbar';
import {Link} from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { connect } from 'react-redux';
import {login} from '../actions/loginAction';

import '../App.css';
import logo from '../assets/twitter.svg'; 
import Loader from '../components/loader';


function Login(props) {
  const [cookies, setCookie] = useCookies();

  const [loginIsOpen,setLoginOpen] = useState(false);
  const [logindata,setLogindata] = useState(null);

  useEffect(() => {
    if(logindata != null)
    {
      console.log(logindata);
      props.login(logindata);
    }
  },[logindata])

  useEffect(() => {
    if(props.data)
    {
      if(props.success === 1)
      {
        setCookie('Token', props.data.token, { path: '/' });
        setCookie('Username', logindata.username, { path: '/' });
      }
      else
      {
        alert('something went wrong...');
      }
      setLogindata(null);
    }
  },[props.data])

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

  return (
    <div className="App">
      <button onClick={openLogin} className="login">
        Login
      </button>
      {props.Loading ? () => closeLogin() : '' }
        <Modal
          isOpen={loginIsOpen}
          onRequestClose={closeLogin}
          className="modalStyle"
          ariaHideApp={false}
        >
          {props.Loading ? <Loader/> :
          <div>
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