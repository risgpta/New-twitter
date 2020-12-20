import {CREATE_TWEET_LOAD,CREATE_TWEET_SUCCESS,CREATE_TWEET_FAIL,UPD_TWEET_LOAD,UPD_TWEET_SUCCESS,UPD_TWEET_FAIL,DEL_TWEET_LOAD,DEL_TWEET_SUCCESS,DEL_TWEET_FAIL} from '../actions/types';

const initialState = {
    isLoading : false,
    data : null, 
    done: -1, 
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
                    done:action.done,
                }
        case CREATE_TWEET_FAIL:
                return{
                    ...state,
                    isLoading : false,
                    data:action.payload,
                    done:action.done,
                }
        case UPD_TWEET_LOAD:
                    return{
                        ...state,
                        isLoading : true,
                        done:action.done,
                    }
        case UPD_TWEET_SUCCESS:
                    return{
                        ...state,
                        isLoading : false,
                        data:action.payload,
                        done:action.done,
                    }
        case UPD_TWEET_FAIL:
                    return{
                        ...state,
                        isLoading : false,
                        data:action.payload,
                        done:action.done,
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
                        done:action.done,
                    }
        case DEL_TWEET_FAIL:
                    return{
                        ...state,
                        isLoading : false,
                        data:action.payload,
                        done:action.done,
                    }
        default : 
        return state;
    }
}