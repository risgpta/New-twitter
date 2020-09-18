import React,{useEffect,useState} from 'react';
import { useCookies } from 'react-cookie';

import '../App.css';

import Tweet from './tweet';

const MyTweetList = (params) => {

    const [cookies, setCookie] = useCookies();
    const [refresh,setRefresh] = useState(true);

    const [tweets,setTweets] = useState([]);

    const request = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json','Authorization':'Token '+cookies.Token},
      };
    
      useEffect(() => {
        if(refresh)
        {
          fetch('https://twitter-clone-mukul.herokuapp.com/mytweet/',request)
          .then(response => {
            console.log(response);
            const responseJson = response.json().then(data => {
            console.log(data); 
            if(response.status === 200)
            {
                setTweets(data);
            }
            else
            {
                let res = '';
                for(let key in data)
                {
                    res=res+key+','+data[key]+'.';
                }
            }
          })   
          })
          .catch(error => {
            const responseJson = error.json().then(data => {
                console.log(data);
                let res = '';
                for(let key in data)
                {
                    res=res+key+','+data[key]+'.';
                }
                console.error('There was an error!', data);
              })
          });
        }
      },[refresh])


    return(
        <div>
             {tweets.slice(0).reverse().map(tweet => {
            return <Tweet id={tweet.id} key={tweet.id} content={tweet.content} likes={tweet.likes} upd={tweet.updation_date} user={tweet.user.username} />;
          })}
        </div>
    );
    
}


export default MyTweetList;
