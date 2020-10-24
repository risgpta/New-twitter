import {ALL_TWEETS_LOAD,ALL_TWEETS_SUCCESS,ALL_TWEETS_FAIL} from './types';

const request = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json'},
};

export const  fetchAllTweets = () => dispatch => {
    
    dispatch({
        type:ALL_TWEETS_LOAD,
        isLoading:true,
    });

    fetch('https://twitter-clone-mukul.herokuapp.com/alltweets/',request)
    .then(response => {
      response.json().then(data => {
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
          let res = '';
          for(let key in data)
          {
              res=res+key+','+data[key]+'.';
          }
          dispatch({
            type:ALL_TWEETS_FAIL,
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
            type:ALL_TWEETS_FAIL,
            isLoading:false,
            payload : res,
          })
        })
    });
}
