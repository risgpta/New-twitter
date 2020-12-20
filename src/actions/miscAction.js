import {CHANGE_TWEET_PAGE,GO_TO_PROFILE,USER_DATA,USERNAME_DATA,LOAD_DATA,SNACK_BAR} from './types';
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

export const  getUsernameData = (data) => dispatch => {
    dispatch({
           type:USERNAME_DATA,
           payload : data,
       });
}

export const  loadData = (load) => dispatch => {
    dispatch({
           type:LOAD_DATA,
           payload : !load,
       });
}

export const  openSnackbar = (data) => dispatch => {
    dispatch({
           type:SNACK_BAR,
           payload : data,
       });
}