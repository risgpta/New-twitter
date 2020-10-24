import {GET_PROFILE_LOAD,GET_PROFILE_SUCCESS,GET_PROFILE_FAIL,UPD_PROFILE_LOAD,UPD_PROFILE_SUCCESS,UPD_PROFILE_FAIL} from './types';

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

    fetch('https://twitter-clone-mukul.herokuapp.com/users/profile/'+payload.username+'/',request)
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
          let res = '';
          for(let key in data)
          {
              res=res+key+','+data[key]+'.';
          }
          console.log(res);
          dispatch({
            type:GET_PROFILE_FAIL,
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
          console.log(res);
          dispatch({
            type:GET_PROFILE_FAIL,
            isLoading:false,
            payload : res,
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

  fetch('https://twitter-clone-mukul.herokuapp.com/users/profile/'+payload.username+'/',request)
  .then(response => {
    response.json().then(data => {
    if(response.status === 200)
    {
        console.log(data);
        dispatch({
            type:UPD_PROFILE_SUCCESS,
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
        console.log(res);
        dispatch({
          type:UPD_PROFILE_FAIL,
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
        console.log(res);
        dispatch({
          type:UPD_PROFILE_FAIL,
          isLoading:false,
          payload : res,
        })
      })
  });
}
