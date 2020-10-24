import {CREATE_TWEET_LOAD,CREATE_TWEET_SUCCESS,CREATE_TWEET_FAIL,UPD_TWEET_LOAD,UPD_TWEET_SUCCESS,UPD_TWEET_FAIL,DEL_TWEET_LOAD,DEL_TWEET_SUCCESS,DEL_TWEET_FAIL} from './types';
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

    fetch('https://twitter-clone-mukul.herokuapp.com/mytweet/',request)
    .then(response => {
      console.log(response);
      const responseJson = response.json().then(data => {
      console.log(data); 
      if(response.status === 200)
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
          let res = '';
          for(let key in data)
          {
              res=res+key+','+data[key]+'.';
          }
          console.log(res);
          dispatch({
            type:CREATE_TWEET_FAIL,
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
            type:CREATE_TWEET_FAIL,
            isLoading:false,
            payload : res,
            done : 0,
          })
        })
    });
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

    fetch('https://twitter-clone-mukul.herokuapp.com/mytweet/update/'+payload.id+'/',request)
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
          let res = '';
          for(let key in data)
          {
              res=res+key+','+data[key]+'.';
          }
          console.log(res);
          dispatch({
            type:UPD_TWEET_FAIL,
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
            type:UPD_TWEET_FAIL,
            isLoading:false,
            payload : res,
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

    fetch('https://twitter-clone-mukul.herokuapp.com/mytweet/delete/'+payload.id+'/',request)
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
          let res = '';
          for(let key in response)
          {
              res=res+key+','+response[key]+'.';
          }
          console.log(res);
          dispatch({
            type:DEL_TWEET_FAIL,
            isLoading:false,
            payload : res,
            done : 0,
          })
      }
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
            type:DEL_TWEET_FAIL,
            isLoading:false,
            payload : res,
            done : 0,
          })
        })
    });
}


