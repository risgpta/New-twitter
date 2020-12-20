import React,{useState,useEffect} from 'react';
import logo from '../assets/twitter.svg'; 
import { connect } from 'react-redux';
import '../App.css';
import Signup from './signup';
import Login from './login';
import CustomizedSnackbars from '../components/snackbar';
import { openSnackbar } from '../actions/miscAction';

function Header(props){

    console.log(localStorage.getItem('twitter-token'))
    return ( 
            <div className="header">
            <img src={logo} alt="logo" style={{height:'48px', width:'48px'}}/>
            {
                !localStorage.getItem('username')  ? <div className="headerContent">Home</div>:<div className="headerContent">Hey Welcome {localStorage.getItem('username')}! 
                </div>
            }
            {
                !localStorage.getItem('username')  ?  <Signup/> : ''
            }
            {
                !localStorage.getItem('username')  ? <Login/> : ''
            }
            <CustomizedSnackbars/>
            </div>
    );
}

const mapStateToProps = (state) => ({
    data: state.loginReducer.data, 
});

const mapDispatchToProps = (dispatch) => {
    return {
        
    };
  };
  
export default connect(mapStateToProps,mapDispatchToProps)(Header);
