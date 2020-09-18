import React,{useContext} from 'react';
import {UtilsContext} from '../contexts/utils';
import '../App.css';
const RightSidebar = () => {
    const {chat,setChat} = useContext(UtilsContext);

    return(
        <div className="rightSidebar">
            <input className="searchTweet" placeholder="Search New Twitter"/>
            {chat ? <textarea className="message" rows="5"></textarea> : ''}
        </div>
    );
}

export default RightSidebar;
