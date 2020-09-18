import React,{useContext} from 'react';
import { useCookies } from 'react-cookie';
import {UtilsContext} from '../contexts/utils';
import '../App.css';

const Sidebar = () => {

    const {mytweet,setMytweet,chat,setChat} = useContext(UtilsContext);

    const [cookies, setCookie,removeCookie] = useCookies();

    function logout(){
        removeCookie('Token',{ path: '/' },-1);
    }

    function goTomytweets(){
        setMytweet(!mytweet);
    }

    function showChat(){
        setChat(!chat);
    }
    return(
        <div className="sidebar">
            <div className="sidebarOptions">#Explore</div>
            <div onClick={showChat} className="sidebarOptions">Messages</div>
            <div onClick={goTomytweets} className="sidebarOptions">{!mytweet ? 'My tweets' : 'All tweets'}</div>
            <div onClick={logout} className="sidebarOptions">log out</div>
        </div>
    );
}

export default Sidebar;
