import React,{useState,useEffect} from 'react';
import Modal from 'react-modal';
import {signup} from '../actions/signupAction';
import {openSnackbar} from '../actions/miscAction';
import '../App.css';
import { connect } from 'react-redux';
import logo from '../assets/twitter.svg'; 
import Loader from '../components/loader';

function Signup(props) {

  const [signupIsOpen,setSignupOpen] = useState(false);
  const [signupdata,setSignupdata] = useState(null);

  function openSignup (){
    setSignupOpen(true);
  }

  function closeSignup(){
    setSignupOpen(false);
 }

  useEffect(() => {
    if(signupdata != null)
    {
      props.signup(signupdata);
      if(props.success === 1)
      {
        console.log('success');
      }
      else
      {
        console.log('Profile creation unsuccessful');  
      }
    }
  },[signupdata])

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
    var regName = /^[a-zA-Z ]*$/;
    var regNum = /[6789][0-9]{9}/;
    var regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(userinfo.username.length === 0)
    {
      props.openSnackbar({
        type : 0,
        msg : 'Username cannot be empty',
      })
      return false;
    }
    if(userinfo.name.length === 0)
    {
      props.openSnackbar({
        type : 0,
        msg : 'Name cannot be empty',
      })
      return false;
    }
    if(userinfo.email.length === 0)
    {
      props.openSnackbar({
        type : 0,
        msg : 'Email cannot be empty',
      })
      return false;
    }
    if(userinfo.password.length < 8 || userinfo.password.length > 32)
    {
      props.openSnackbar({
        type : 0,
        msg : 'Password must have length between 8 and 32',
      })
      return false;
    }

    if(regName.test(userinfo.name) === false)
    {
      props.openSnackbar({
        type : 0,
        msg : 'Invalid Name',
      })
      return false;
    }
    if(regEmail.test(userinfo.email) === false)
    {
      props.openSnackbar({
        type : 0,
        msg : 'Invalid Email',
      })
      return false;
    }
    setSignupdata(userinfo);
    closeSignup();
  }

  return (
      <div className="App">
      <button onClick={openSignup} className="signup">
        Sign Up
      </button>
      <Modal
          isOpen={signupIsOpen}
          onRequestClose={closeSignup}
          className="modalStyle"
          ariaHideApp={false}
        >
          {props.Loading ? <Loader/> : 
          <div className="basediv">
           <img src={logo} alt="logo" style={{height:'30px', width:'30px', display:'block', margin:'auto',marginTop:'20px'}}/>
          <form id="signup" className="formStyle" >
            <label>Name</label>
            <input name="name" type="text" />
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
          </div> }
        </Modal>
    </div>
  );
}


const mapStateToProps = (state) => ({
  data : state.signupReducer.data,
  Loading : state.signupReducer.isLoading,
  success : state.signupReducer.done,
})

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (payload) => dispatch(signup(payload)),
    openSnackbar : (payload) => dispatch(openSnackbar(payload))
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Signup);