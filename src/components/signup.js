import React,{useState,useEffect} from 'react';
import Modal from 'react-modal';

import { useSnackbar } from 'react-simple-snackbar';

import '../App.css';
import logo from '../assets/twitter.svg'; 

function Signup() {
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

  const [signupIsOpen,setSignupOpen] = useState(false);
  const [signupdata,setSignupdata] = useState(null);

  function openSignup (){
    setSignupOpen(true);
  }

  function closeSignup(){
    setSignupOpen(false);
 }

  const requestSignup = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(signupdata)
  };

  useEffect(() => {
    if(signupdata != null)
    {
      fetch('https://twitter-clone-mukul.herokuapp.com/users/register/',requestSignup)
      .then(response => {
        console.log(response);
        const responseJson = response.json().then(data => {
          console.log(data); 
          if(response.status === 201)
          {
              openSnackbar('Account created successfully');
            //window.location.href = "https://twitter.com/";
          }
          else
          {
            let res = '';
            for(let key in data)
            {
                res=res+key+','+data[key]+'.';
            }
            openErrSnackbar(res);
              //openErrSnackbar('Account creation unsuccessful');
          }
        }) ;
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
          //openErrSnackbar('Account creation unsuccessful');
          console.error('There was an error!', data);
        })
      });
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
    </div>
  );
}

export default Signup;