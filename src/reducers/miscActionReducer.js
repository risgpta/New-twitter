import {CHANGE_TWEET_PAGE,GO_TO_PROFILE} from '../actions/types';

const initialState = {
    flag : true,
    profile : false,
}

export default function(state = initialState,action){
    switch(action.type){
        case CHANGE_TWEET_PAGE:
                return{
                    ...state,
                   flag : action.payload
                }
        case GO_TO_PROFILE:
            return{
                ...state,
                profile : action.payload
            }
        default : 
        return state;
    }
}