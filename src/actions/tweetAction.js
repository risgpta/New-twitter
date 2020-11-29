import {CREATE_TWEET_LOAD,CREATE_TWEET_SUCCESS,CREATE_TWEET_FAIL,UPD_TWEET_LOAD,UPD_TWEET_SUCCESS,UPD_TWEET_FAIL,DEL_TWEET_LOAD,DEL_TWEET_SUCCESS,DEL_TWEET_FAIL} from './types';
import {BASE} from './baseurl';
export const  createTweet = (payload) => dispatch => {

    console.log(payload);
    const request = {
        method: 'POST',
        headers : {'Authorization':'Token '+payload.token},
        body: payload.data,
    };
    
    dispatch({
        type:CREATE_TWEET_LOAD,
        isLoading:true,
    });

    fetch(`${BASE}/tweet`,request)
    .then(response => response.json()).then(data => {
      console.log(data); 
      if(data.status === 200)
      {
        dispatch({
            type:CREATE_TWEET_SUCCESS,
            isLoading:false,
            payload : data,
            done : 1,
        })        
      }
      else
      {
          dispatch({
            type:CREATE_TWEET_FAIL,
            isLoading:false,
            payload : data,
            done : 0,
          })
      }
    })   
    .catch(err => {
          dispatch({
            type:CREATE_TWEET_FAIL,
            isLoading:false,
            payload : err,
            done : 0,
          })
    })
}

export const  updateTweet = (payload) => dispatch => {

    console.log(payload);
    const request = {
        method: 'PUT',
        headers : {'Authorization':'Token '+payload.token,'Content-Type': 'application/json'},
        body: payload.body,
    };
    
    dispatch({
        type:UPD_TWEET_LOAD,
        isLoading:true,
    });

    fetch(`${BASE}/tweet?tweet_id=${payload.tweet_id}`,request)
    .then(response => {
      console.log(response);
      const responseJson = response.json().then(data => {
      console.log(data); 
      if(response.status === 200)
      {
        dispatch({
            type:UPD_TWEET_SUCCESS,
            isLoading:false,
            payload : data,
            done : 1,
        })        
      }
      else
      {
          dispatch({
            type:UPD_TWEET_FAIL,
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
            type:UPD_TWEET_FAIL,
            isLoading:false,
            payload : data,
            done : 0,
          })
        })
    });
}

export const  deleteTweet = (payload) => dispatch => {

    console.log(payload);
    const request = {
        method: 'DELETE',
        headers : {'Authorization':'Token '+payload.token,},
    };
    
    dispatch({
        type:DEL_TWEET_LOAD,
        isLoading:true,
    });

    fetch(`${BASE}/tweet?tweet_id=${payload.tweet_id}`,request)
    .then(response => {
      console.log(response);
      if(response.status === 204)
      {
        dispatch({
            type:DEL_TWEET_SUCCESS,
            isLoading:false,
            payload : response,
            done : 1,
        })        
      }
      else
      {
          dispatch({
            type:DEL_TWEET_FAIL,
            isLoading:false,
            payload : response,
            done : 0,
          })
      }
    })
    .catch(error => {
      console.log(error);
          dispatch({
            type:DEL_TWEET_FAIL,
            isLoading:false,
            payload : error,
            done : 0,
          })
    });
}


