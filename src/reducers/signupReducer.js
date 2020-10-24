import {SIGNUP_LOAD,SIGNUP_SUCCESS,SIGNUP_FAIL} from '../actions/types';

const initialState = {
    isLoading : false,
    data : null,  
    done : -1,
}

export default function(state = initialState,action){
    switch(action.type){
        case SIGNUP_LOAD:
                return{
                    ...state,
                    isLoading : true,
                }
        case SIGNUP_SUCCESS:
                return{
                    ...state,
                    isLoading : false,
                    data:action.payload,
                    done:action.done,
                }
        case SIGNUP_FAIL:
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