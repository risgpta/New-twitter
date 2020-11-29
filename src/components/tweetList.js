import React,{useEffect,useState,useContext} from 'react';


import {UtilsContext} from '../contexts/utils';

import '../App.css';

import Tweet from './tweet';

const TweetList = (params) => {

    
    const [refresh,setRefresh] = useState(true);

    const [tweets,setTweets] = useState([]);
    
    const {loader,setLoader,loader2,setLoader2} = useContext(UtilsContext);

    const request = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'},
      };
    
      useEffect(() => {
        if(refresh)
        {
          fetch('https://twitter-clone-mukul.herokuapp.com/alltweets/',request)
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
      },[refresh,loader,loader2])


    return(
        <div>
             {tweets.slice(0).reverse().map(tweet => {
            return <Tweet key={tweet.id} id={tweet.id} content={tweet.content} likes={tweet.likes} upd={tweet.updation_date} user={tweet.user.username} image={tweet.profile_image} post_image={tweet.image}/>;
          })}
        </div>
    );
    
}


export default TweetList;
