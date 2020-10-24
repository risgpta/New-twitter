import {CREATE_TWEET_LOAD,CREATE_TWEET_SUCCESS,CREATE_TWEET_FAIL,UPD_TWEET_LOAD,UPD_TWEET_SUCCESS,UPD_TWEET_FAIL,DEL_TWEET_LOAD,DEL_TWEET_SUCCESS,DEL_TWEET_FAIL} from '../actions/types';

const initialState = {
    isLoading : false,
    data : null,  
}

export default function(state = initialState,action){
    switch(action.type){
        case CREATE_TWEET_LOAD:
                return{
                    ...state,
                    isLoading : true,
                }
        case CREATE_TWEET_SUCCESS:
                return{
                    ...state,
                    isLoading : false,
                    data:action.payload,
                }
        case CREATE_TWEET_FAIL:
                return{
                    ...state,
                    isLoading : false,
                    data:action.payload,
                }
        case UPD_TWEET_LOAD:
                    return{
                        ...state,
                        isLoading : true,
                    }
        case UPD_TWEET_SUCCESS:
                    return{
                        ...state,
                        isLoading : false,
                        data:action.payload,
                    }
        case UPD_TWEET_FAIL:
                    return{
                        ...state,
                        isLoading : false,
                        data:action.payload,
                    }
        case DEL_TWEET_LOAD:
                    return{
                        ...state,
                        isLoading : true,
                    }
        case DEL_TWEET_SUCCESS:
                    return{
                        ...state,
                        isLoading : false,
                        data:action.payload,
                    }
        case DEL_TWEET_FAIL:
                    return{
                        ...state,
                        isLoading : false,
                        data:action.payload,
                    }
        default : 
        return state;
    }
}