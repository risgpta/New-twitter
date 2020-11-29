import {SIGNUP_LOAD,SIGNUP_SUCCESS,SIGNUP_FAIL} from './types';
import {BASE} from './baseurl';
export const  signup = (payload) => dispatch => {
    const request = {
        method: 'POST',
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         },
        body: JSON.stringify(payload)
      };
    
       dispatch({
        type:SIGNUP_LOAD,
        isLoading:true,
    });

    fetch(`${BASE}/auth/register/`,request)
    .then(response => response.json())
    .then(data => {
      console.log(data); 
      if(data.status === 200)
      {
        dispatch({
            type:SIGNUP_SUCCESS,
            isLoading:false,
            payload : data,
            done : 1,
        })        
      }
      else
      {
          dispatch({
            type:SIGNUP_FAIL,
            isLoading:false,
            payload : data,
            done : -1,
          })
      }
    })   
    .catch(err => {
          console.log(err);
          dispatch({
            type:SIGNUP_FAIL,
            isLoading:false,
            payload : err,
            done : 0,
          })
    });
}
