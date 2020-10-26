import React,{useContext,useEffect} from 'react';
import { useCookies } from 'react-cookie';
import {UtilsContext} from '../contexts/utils';
import {logout} from '../actions/loginAction';
import { connect } from 'react-redux';
import '../App.css';
import { changeTweetPage, goToProfile } from '../actions/miscAction';

const Sidebar = (props) => {

    const {chat,setChat} = useContext(UtilsContext);

    const [cookies, setCookie,removeCookie] = useCookies();

    function logout(){
        removeCookie('Token',{ path: '/' },-1);
        removeCookie('Username',{ path: '/' },-1);
        props.logout();
    }
    useEffect(()=>{

        
    },[props.flag,props.profile])

    function goTomytweets(){
        props.changeTweetPage(props.flag);
    }

    function gotoProfile(){
        props.goToProfile(props.profile);
    }

    function showChat(){
        //setChat(!chat);
    }
    return(
        <div className="sidebar">
            <div className="sidebarOptions">#Explore</div>
            {
                cookies.Username === null || cookies.Username === undefined ?  '' 
                :
                <div className="mobileSec">
                <div onClick={showChat} className="sidebarOptions">Messages</div>
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
    );
}

const mapStateToProps = (state) => ({
    flag : state.miscActionReducer.flag,
    profile : state.miscActionReducer.profile,
  })
  
const mapDispatchToProps = (dispatch) => {
    return {
      logout: () => dispatch(logout()),
      changeTweetPage: (payload) => dispatch(changeTweetPage(payload)),
      goToProfile: (payload) => dispatch(goToProfile(payload)),
    };
  };
  
export default connect(mapStateToProps,mapDispatchToProps)(Sidebar);