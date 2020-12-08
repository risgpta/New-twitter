import {CHANGE_TWEET_PAGE,GO_TO_PROFILE,USER_DATA,LOAD_DATA} from '../actions/types';

const initialState = {
    flag : true,
    profile : false,
    userData : {},
    load : false,
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
        case USER_DATA:
            return{
                ...state,
                userData : action.payload 
            }
        case LOAD_DATA:
            return{
                    ...state,
                    load : action.payload 
            }
        default : 
        return state;
    }
}