import {GET_PROFILE_LOAD,GET_PROFILE_SUCCESS,GET_PROFILE_FAIL,UPD_PROFILE_LOAD,UPD_PROFILE_SUCCESS,UPD_PROFILE_FAIL} from './types';
import {BASE} from './baseurl';

export const  fetchProfile = (payload) => dispatch => {

    console.log(payload);
    const request = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'},
    };
    
    dispatch({
        type:GET_PROFILE_LOAD,
        isLoading:true,
    });

    fetch(`${BASE}/profile?username=${payload.username}`,request)
    .then(response => {
      response.json().then(data => {
      if(response.status === 200)
      {
          console.log(data);
          dispatch({
              type:GET_PROFILE_SUCCESS,
              isLoading:false,
              payload : data,
          })
      }
      else
      {
          dispatch({
            type:GET_PROFILE_FAIL,
            isLoading:false,
            payload : data,
        })
      }
    })   
    })
    .catch(error => {
          error.json().then(data => {
          dispatch({
            type:GET_PROFILE_FAIL,
            isLoading:false,
            payload : data,
          })
        })
    });
}

export const  updateProfile = (payload) => dispatch => {

  console.log(payload);
  const request = {
      method: 'PUT',
      headers : {'Authorization':'Token '+payload.token},
      body: payload.data,
  };
  
  dispatch({
      type:UPD_PROFILE_LOAD,
      isLoading:true,
  });

  fetch(`${BASE}/profile/update?username=${payload.username}`,request)
  .then(response => {
    response.json().then(data => {
    if(response.status === 200)
    {
        console.log(data);
        dispatch({
            type:UPD_PROFILE_SUCCESS,
            isLoading:false,
        })
    }
    else
    {
        dispatch({
          type:UPD_PROFILE_FAIL,
          isLoading:false,
      })
    }
  })   
  })
  .catch(error => {
        error.json().then(data => {
        dispatch({
          type:UPD_PROFILE_FAIL,
          isLoading:false,
        })
      })
  });
}
