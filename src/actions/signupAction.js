import {SIGNUP_LOAD,SIGNUP_SUCCESS,SIGNUP_FAIL} from './types';
export const  signup = (payload) => dispatch => {

    console.log(payload);
    const request = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      };
    
       dispatch({
        type:SIGNUP_LOAD,
        isLoading:true,
    });

    fetch('https://twitter-clone-mukul.herokuapp.com/users/register/',request)
    .then(response => {
      console.log(response);
      const responseJson = response.json().then(data => {
      console.log(data); 
      if(response.status === 200)
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
          let res = '';
          for(let key in data)
          {
              res=res+key+','+data[key]+'.';
          }
          console.log(res);
          dispatch({
            type:SIGNUP_FAIL,
            isLoading:false,
            payload : res,
            done : 0,
          })
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
          console.log('error'+res)
          dispatch({
            type:SIGNUP_FAIL,
            isLoading:false,
            payload : res,
            done : 0,
          })
        })
    });
}
