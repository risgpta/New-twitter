import {ALL_TWEETS_LOAD,ALL_TWEETS_SUCCESS,ALL_TWEETS_FAIL} from '../actions/types';

const initialState = {
    isLoading : false,
    tweets : [],
    users : [],
    data : null, 
}

export default function(state = initialState,action){

    switch(action.type){
        case ALL_TWEETS_LOAD:
                return{
                    ...state,
                    isLoading : true,
                }
        case ALL_TWEETS_SUCCESS:
                return{
                    ...state,
                    isLoading : false,
                    tweets : [...initialState.tweets,...action.tweets],
                    users : [...initialState.users,...action.users],
                }
        case ALL_TWEETS_FAIL:
                return{
                    ...state,
                    isLoading : false,
                    data:action.payload,
                }
        default : 
        return state;
    }
}