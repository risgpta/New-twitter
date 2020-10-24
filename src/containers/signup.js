import React,{useState,useEffect} from 'react';
import Modal from 'react-modal';
import {signup} from '../actions/signupAction';
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
      console.log(signupdata);
      props.signup(signupdata);
    }
  },[signupdata])

  useEffect(() => {
    if(props.success === 1)
    {
      console.log('success');
    }
    else
    {
      console.log('Profile creation unsuccessful');  
    }
  },[props.data]);

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
          <div>
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
          </div> }
        </Modal>
    </div>
  );
}


const mapStateToProps = (state) => ({
  data : state.signupReducer.data,
  Loading : state.signupReducer.isLoading,
  success : state.signupReducer.success,
})

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (payload) => dispatch(signup(payload)),
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Signup);