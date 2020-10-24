import {MY_TWEETS_LOAD,MY_TWEETS_SUCCESS,MY_TWEETS_FAIL} from '../actions/types';

const initialState = {
    isLoading : false,
    data : null,  
}

export default function(state = initialState,action){
    switch(action.type){
        case MY_TWEETS_LOAD:
                return{
                    ...state,
                    isLoading : true,
                }
        case MY_TWEETS_SUCCESS:
                return{
                    ...state,
                    isLoading : false,
                    data:action.payload,
                }
        case MY_TWEETS_FAIL:
                return{
                    ...state,
                    isLoading : false,
                    data:action.payload,
                }
        default : 
        return state;
    }
}