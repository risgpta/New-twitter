import {CHANGE_TWEET_PAGE,GO_TO_PROFILE} from './types';
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