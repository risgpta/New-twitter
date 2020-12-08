import {CHANGE_TWEET_PAGE,GO_TO_PROFILE,USER_DATA,LOAD_DATA} from './types';
export const  changeTweetPage = (flag) => dispatch => {
     dispatch({
            type:CHANGE_TWEET_PAGE,
            payload : !flag,
        });
}

export const  goToProfile = (profile) => dispatch => {
    dispatch({
           type:GO_TO_PROFILE,
           payload : !profile,
       });
}

export const  getUserData = (data) => dispatch => {
    dispatch({
           type:USER_DATA,
           payload : data,
       });
}

export const  loadData = (load) => dispatch => {
    dispatch({
           type:LOAD_DATA,
           payload : !load,
       });
}