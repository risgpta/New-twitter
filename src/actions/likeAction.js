import {GET_LIKE_LIST_LOAD,GET_LIKE_LIST_SUCCESS,GET_LIKE_LIST_FAIL,LIKE_TWEET} from './types';
import {BASE} from './baseurl';

export const  fetchLikeList = (payload) => dispatch => {

  let request = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json',
  },
};

    dispatch({
        type:GET_LIKE_LIST_LOAD,
        isLoading:true,
    });

    fetch(`${BASE}/tweet/tweet-like?_id=${payload.tweet_id}`,request)
    .then(response => {
      response.json().then(data => {
          console.log(payload.tweet_id);
          console.log(data);
      if(response.status === 200)
      {
          dispatch({
              type:GET_LIKE_LIST_SUCCESS,
              isLoading:false,
              payload : data,
          })
      }
      else
      {
          dispatch({
            type:GET_LIKE_LIST_FAIL,
            isLoading:false,
            payload : data,
        })
      }
    })   
    })
    .catch(error => {
          error.json().then(error=> {
          dispatch({
            type:GET_LIKE_LIST_FAIL,
            isLoading:false,
            payload : error,
          })
        })
    });
}

export const  likeTweet = (payload) => dispatch => {

    console.log(payload);
    const request = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json',
        'Authorization' : 'token '+localStorage.getItem('token'),
      },
        body: payload.body,
    };
    
    dispatch({
        type:LIKE_TWEET,
        isLoading:true,
    });

    fetch(`${BASE}/tweet/tweet-like`,request)
    .then(response => {
      console.log(response);
      const responseJson = response.json().then(data => {
      console.log(data); 
      if(response.status === 200)
      {
        dispatch({
            type:LIKE_TWEET,
            isLoading:false,
            payload : data,
            done : 1,
        })        
      }
      else
      {
          dispatch({
            type:LIKE_TWEET,
            isLoading:false,
            payload : data,
            done : 0,
          })
      }
    })   
    })
    .catch(error => {
      const responseJson = error.json().then(data => {
          dispatch({
            type:LIKE_TWEET,
            isLoading:false,
            payload : data,
            done : 0,
          })
        })
    });
}
