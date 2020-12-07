import React,{useEffect} from 'react';
import {logout} from '../actions/loginAction';
import { connect } from 'react-redux';
import '../App.css';
import { changeTweetPage, goToProfile } from '../actions/miscAction';

const Sidebar = (props) => {


    function logout(){
        localStorage.removeItem('token');
        localStorage.removeItem('userid');
        localStorage.removeItem('name');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('userPic');
        props.logout();
    }

    function goTomytweets(){
        props.changeTweetPage(props.flag);
    }

    function gotoProfile(){
        props.goToProfile(props.profile);
    }

    return(
        <div className="sidebar">
            <div className="sidebarDiv">
            <div className="sidebarOptions">#Explore</div>
            {
                localStorage.getItem('username') === null || localStorage.getItem('username') === undefined ?  '' 
                :
                <div className="mobileSec">
                <div className="sidebarOptions">Messages</div>
                {
                    props.profile === false ?
                    <div onClick={goTomytweets}  className="sidebarOptions">{props.flag ? 'My tweets' : 'All tweets'}</div>
                    :
                    <div onClick={gotoProfile}  className="sidebarOptions">Home</div>
                }
                <div onClick={logout} className="sidebarOptions">log out</div>
                </div>
            }
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    flag : state.miscActionReducer.flag,
    profile : state.miscActionReducer.profile,
    success : state.loginReducer.done, 
  })
  
const mapDispatchToProps = (dispatch) => {
    return {
      logout: () => dispatch(logout()),
      changeTweetPage: (payload) => dispatch(changeTweetPage(payload)),
      goToProfile: (payload) => dispatch(goToProfile(payload)),
    };
  };
  
export default connect(mapStateToProps,mapDispatchToProps)(Sidebar);