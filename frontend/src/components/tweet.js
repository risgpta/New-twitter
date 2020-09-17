import React from 'react';

import like from '../assets/heart.svg'; 
import profile from '../assets/person.svg'; 
import '../App.css';

const Tweet = (props) => {
    let time = props.upd;
    let date = time.split('T');
    const Update_date = new Date(date[0]);
    let time2 = date[1].substr(0,8);
    let Update_time = new Date(time);
    return (
        <div className="tweet">
          <div className="aboveTweet">
            <div className="user" ><img src={profile} alt="profile" style={{height:'30px', width:'30px', display:'inline', margin:'auto'}}/>{props.user}</div>
            <div className="tweetTime">{ Update_time.toLocaleTimeString('en-US', { hour: 'numeric',minute:'numeric', hour12: true })}, {Update_date.toDateString()}</div>
            </div>
            <div className="tweetContent">{props.content}</div>
            <div className="likes"><img src={like} alt="like" style={{height:'30px', width:'30px', display:'inline', margin:'auto'}}/>{props.likes}</div>
        </div>
    );
}

export default Tweet;