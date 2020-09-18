import React,{useEffect,useContext,useState} from 'react';

import like from '../assets/heart.svg'; 
import profile from '../assets/person.svg'; 
import {SnackbarContext} from '../contexts/snackbar';
import { useCookies } from 'react-cookie';

import '../App.css';

const Tweet = (props) => {
    
    const {options,optionsError,openSnackbar,openErrSnackbar} = useContext(SnackbarContext);
    const [cookies, setCookie] = useCookies();

    const [deleteTweetid,setDeleteTweetid] = useState(null);


    const request= {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json','Authorization':'Token '+cookies.Token},
    };

    function deletePost(id){
        setDeleteTweetid(id);
        console.log(id);
    }

    useEffect(() => {
        if(deleteTweetid)
        {
            fetch('https://twitter-clone-mukul.herokuapp.com/mytweet/delete/'+deleteTweetid+'/',request)
      .then(response => {
        console.log(response);
        if(response.status === 204)
        {
          openSnackbar('Tweet deleted successfully');
        }
        else
        {
            openErrSnackbar('deletion unsuccessful');
        }
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
            console.error('There was an error!', data);
          })
        });
        }
    },[deleteTweetid])

    let time = props.upd;
    let date = time.split('T');
    const Update_date = new Date(date[0]);
    let Update_time = new Date(time);
    return (
        <div className="tweet">
          <div className="aboveTweet">
            <div className="user" ><img src={profile} alt="profile" style={{height:'30px', width:'30px', display:'inline', margin:'auto'}}/>{props.user}</div>
            <div className="tweetTime">{ Update_time.toLocaleTimeString('en-US', { hour: 'numeric',minute:'numeric', hour12: true })}, {Update_date.toDateString()}</div>
            </div>
            <div className="tweetContent">{props.content}</div>
            <div className="likes"><img src={like} alt="like" style={{height:'30px', width:'30px', display:'inline', margin:'auto'}}/>
            {props.likes}
            {
                cookies.Username === props.user ? <span onClick={() => deletePost(props.id)} className="deletebtn">delete</span> : ''
            }
            </div>
        </div>
    );
}

export default Tweet;