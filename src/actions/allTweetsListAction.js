import {ALL_TWEETS_LOAD,ALL_TWEETS_SUCCESS,ALL_TWEETS_FAIL} from './types';
import {BASE} from './baseurl';
import { connect } from 'react-redux';

export const  fetchAllTweets = (payload) => dispatch => {

  let request = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json',
  },
};

    if(localStorage.getItem('twitter-token'))
    {
        request = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json',
          'Authorization' : 'token '+localStorage.getItem('twitter-token'),
        },
      };
    }

    console.log('id',localStorage.getItem('twitter-token'));
    console.log(request);

    dispatch({
        type:ALL_TWEETS_LOAD,
        isLoading:true,
    });

    fetch(`${BASE}/tweet/alltweets?page=${payload}`,request)
    .then(response => {
      response.json().then(data => {
        console.log(payload);
        console.log(data);
      if(response.status === 200)
      {
          dispatch({
              type:ALL_TWEETS_SUCCESS,
              isLoading:false,
              tweets : data.message.tweets,
              users : data.message.users,
          })
      }
      else
      {
          dispatch({
            type:ALL_TWEETS_FAIL,
            isLoading:false,
            payload : data,
        })
      }
    })   
    })
    .catch(error => {
          error.json().then(error=> {
          dispatch({
            type:ALL_TWEETS_FAIL,
            isLoading:false,
            payload : error,
          })
        })
    });
}


