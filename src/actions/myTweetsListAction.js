
import {MY_TWEETS_LOAD,MY_TWEETS_SUCCESS,MY_TWEETS_FAIL} from './types';
import {BASE} from './baseurl';

export const  fetchMyTweets = () => dispatch => {
    
    console.log('token-',localStorage.getItem('token'));
    console.log('userid-',localStorage.getItem('userid'));
    const request = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
        'Authorization' : 'token '+localStorage.getItem('token'),
        },
    };

    dispatch({
        type:MY_TWEETS_LOAD,
        isLoading:true,
    });

    fetch(`${BASE}/tweet/?page=1&userid=${localStorage.getItem('userid')}`,request)
    .then(response => {
      response.json().then(data => {
        console.log(data);
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
          dispatch({
            type:MY_TWEETS_FAIL,
            isLoading:false,
            payload : data,
        })
      }
    })   
    })
    .catch(error => {
          error.json().then(error => {
          dispatch({
            type:MY_TWEETS_FAIL,
            isLoading:false,
            payload : error,
          })
        })
    });
}
