import {LOGIN_LOAD,LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT, SNACK_BAR} from './types';
import {BASE} from './baseurl';
export const  login = (payload) => dispatch => {
    const request = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      };
    
       dispatch({
        type:LOGIN_LOAD,
        isLoading:true,
    });

    fetch(`${BASE}/auth/login`,request)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if(data.token)
      { 
        localStorage.setItem('twitter-token',data.token);
        localStorage.setItem('userid',data.user_info._id);
        localStorage.setItem('name',data.user_info.name);
        localStorage.setItem('username',data.user_info.username);
        localStorage.setItem('email',data.user_info.email);
        localStorage.setItem('userPic',data.user_info.profile.profilePic);
        dispatch({
            type:LOGIN_SUCCESS,
            isLoading:false,
            payload : data,
            done : 1,
        }) 
        dispatch({
          type:SNACK_BAR,
          payload : {
            type:1,
            msg:"logged in!"
          }
        }) 
      } 
      else
      {
        dispatch({
          type:LOGIN_FAIL,
          isLoading:false,
          payload : data,
          done : -1,
        })
        dispatch({
          type:SNACK_BAR,
          payload : {
            type:0,
            msg:data.message,
          }
        }) 
      }    
    })   
    .catch(err => {
          console.log(err);
          dispatch({
            type:LOGIN_FAIL,
            isLoading:false,
            payload : err,
            done : -1,
          })
          dispatch({
            type:SNACK_BAR,
            payload : {
              type:0,
              msg:err.message,
            }
          }) 
    });
}

export const logout = () => dispatch => {
  dispatch({
    type:LOGOUT,
    isLoading:false,
    payload:null,
});
}
