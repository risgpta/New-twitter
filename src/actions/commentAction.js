import {CREATE_COMMENT_LOAD,CREATE_COMMENT_SUCCESS,CREATE_COMMENT_FAIL,READ_COMMENT_LOAD,READ_COMMENT_SUCCESS,READ_COMMENT_FAIL,UPD_COMMENT_LOAD,UPD_COMMENT_SUCCESS,UPD_COMMENT_FAIL,DEL_COMMENT_LOAD,DEL_COMMENT_SUCCESS,DEL_COMMENT_FAIL,SNACK_BAR} from './types';
import {BASE} from './baseurl';
export const  createComment= (payload) => dispatch => {

    console.log(payload);
    const request = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
        'Authorization' : 'token '+localStorage.getItem('twitter-token'),
      },
        body: payload.data,
    };
    
    dispatch({
        type:CREATE_COMMENT_LOAD,
        isLoading:true,
    });

    let url = `${BASE}/tweet/addcomment?_id=${payload._id}&parentid=${payload.parentid}&threadlevel=${payload.threadlevel}`;

    if(payload.threadlevel === 0)
    url = `${BASE}/tweet/addcomment?_id=${payload._id}&threadlevel=${payload.threadlevel}`;

    fetch(url,request)
    .then(response => response.json()).then(data => {
      console.log(data); 
        dispatch({
            type:CREATE_COMMENT_SUCCESS,
            isLoading:false,
            payload : data,
            done : 2,
        })
        dispatch({
          type:SNACK_BAR,
          payload : {
            type:1,
            msg:"Posted!"
          }
        })     
    })   
    .catch(err => {
        console.log(err);
        dispatch({
            type:SNACK_BAR,
            payload : {
              type:0,
              msg:"Post unsuccessful!"
            }
          }) 
          dispatch({
            type:CREATE_COMMENT_FAIL,
            isLoading:false,
            payload : err,
            done : 0,
          })
    })
}


export const  readComment = (id) => dispatch => {
    
    let request = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
      },
    };

    dispatch({
        type:READ_COMMENT_LOAD,
        isLoading:true,
    });

    fetch(`${BASE}/tweet/getcomment?_id=${id}`,request)
    .then(response => {
      response.json().then(data => {
        console.log(data);
      if(response.status === 200)
      {
          dispatch({
              type:READ_COMMENT_SUCCESS,
              isLoading:false,
              payload : data,
              done : 1,
          })
      }
      else
      {
          dispatch({
            type:READ_COMMENT_FAIL,
            isLoading:false,
            payload : data,
            done : 0,
        })
      }
    })   
    })
    .catch(error => {
        console.log(error);
          dispatch({
            type:READ_COMMENT_FAIL,
            isLoading:false,
            payload : error,
            done : 0,
          })
    });
}


export const  updateComment = (payload) => dispatch => {

    console.log(payload);
    const request = {
        method: 'PUT',
        headers : {'Authorization':'Token '+payload.token,'Content-Type': 'application/json'},
        body: payload.data,
    };
    
    dispatch({
        type:UPD_COMMENT_LOAD,
        isLoading:true,
    });

    fetch(`${BASE}/tweet/editcomment?_id=${payload._id}&commentid=${payload.commentid}`,request)
    .then(response => {
      console.log(response);
      const responseJson = response.json().then(data => {
      console.log(data); 
        dispatch({
            type:UPD_COMMENT_SUCCESS,
            isLoading:false,
            payload : data,
            done : 1,
        })        
    })   
    })
    .catch(error => {
      const responseJson = error.json().then(data => {
          dispatch({
            type:UPD_COMMENT_FAIL,
            isLoading:false,
            payload : data,
            done : 0,
          })
        })
    });
}

export const  deleteComment = (payload) => dispatch => {

    console.log(payload);
    const request = {
        method: 'DELETE',
        headers : {'Authorization':'Token '+payload.token,},
    };
    
    dispatch({
        type:DEL_COMMENT_LOAD,
        isLoading:true,
    });

    fetch(`${BASE}/tweet/deletecomment?_id=${payload._id}&commentid=${payload.commentid}&threadlevel=${payload.threadlevel}&parentid=${payload.parentid}`,request)
    .then(response => {
      console.log(response);
        dispatch({
            type:DEL_COMMENT_SUCCESS,
            isLoading:false,
            payload : response,
            done : 1,
        })        
    })
    .catch(error => {
      console.log(error);
          dispatch({
            type:DEL_COMMENT_FAIL,
            isLoading:false,
            payload : error,
            done : 0,
          })
    });
}


