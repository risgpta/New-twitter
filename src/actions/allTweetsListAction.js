import {ALL_TWEETS_LOAD,ALL_TWEETS_SUCCESS,ALL_TWEETS_FAIL} from './types';
import {BASE} from './baseurl';

export const  fetchAllTweets = () => dispatch => {

  let request = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json',
  },
};

    if(localStorage.getItem('token'))
    {
        request = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json',
          'Authorization' : 'token '+localStorage.getItem('token'),
        },
      };
    }

    console.log('id',localStorage.getItem('token'));
    console.log(request);

    dispatch({
        type:ALL_TWEETS_LOAD,
        isLoading:true,
    });

    fetch(`${BASE}/tweet/alltweets`,request)
    .then(response => {
      response.json().then(data => {
        console.log(data);
      if(response.status === 200)
      {
          dispatch({
              type:ALL_TWEETS_SUCCESS,
              isLoading:false,
              payload : data,
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
