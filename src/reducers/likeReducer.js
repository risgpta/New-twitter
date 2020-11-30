import {GET_LIKE_LIST_LOAD,GET_LIKE_LIST_SUCCESS,GET_LIKE_LIST_FAIL,LIKE_TWEET} from '../actions/types';

const initialState = {
    isLoading : false,
    data : null,  
    flag: null,
}

export default function(state = initialState,action){
    switch(action.type){
        case GET_LIKE_LIST_LOAD:
                return{
                    ...state,
                    isLoading : true,
                }
        case GET_LIKE_LIST_SUCCESS:
                return{
                    ...state,
                    isLoading : false,
                    data:action.payload,
                }
        case GET_LIKE_LIST_FAIL:
                return{
                    ...state,
                    isLoading : false,
                    data:action.payload,
                }
        case LIKE_TWEET:
                return{
                    ...state,
                    isLoading : false,
                    flag:action.payload,
                }
        default : 
        return state;
    }
}