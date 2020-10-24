import { Cookies } from 'react-cookie';
import {MY_TWEETS_LOAD,MY_TWEETS_SUCCESS,MY_TWEETS_FAIL} from './types';

export const  fetchMyTweets = (payload) => dispatch => {
    
    const request = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
        'Authorization':'Token '+payload.token,
        },
    };

    dispatch({
        type:MY_TWEETS_LOAD,
        isLoading:true,
    });

    fetch('https://twitter-clone-mukul.herokuapp.com/mytweet/',request)
    .then(response => {
      response.json().then(data => {
      if(response.status === 200)
      {
          dispatch({
              type:MY_TWEETS_SUCCESS,
              isLoading:false,
              payload : data,
          })
      }
      else
      {
          let res = '';
          for(let key in data)
          {
              res=res+key+','+data[key]+'.';
          }
          dispatch({
            type:MY_TWEETS_FAIL,
            isLoading:false,
            payload : res,
        })
      }
    })   
    })
    .catch(error => {
          error.json().then(data => {
          let res = '';
          for(let key in data)
          {
            res=res+key+','+data[key]+'.';
          }
          dispatch({
            type:MY_TWEETS_FAIL,
            isLoading:false,
            payload : res,
          })
        })
    });
}
