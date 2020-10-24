import {LOGIN_LOAD,LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT} from '../actions/types';

const initialState = {
    isLoading : false,
    data : null,  
    done : -1,
}

export default function(state = initialState,action){
    switch(action.type){
        case LOGIN_LOAD:
                return{
                    ...state,
                    isLoading : true,
                }
        case LOGIN_SUCCESS:
                return{
                    ...state,
                    isLoading : false,
                    data:action.payload,
                    done:action.done,
                }
        case LOGIN_FAIL:
                return{
                    ...state,
                    isLoading : false,
                    data:action.payload,
                    done:action.done,
                }
        case LOGOUT:
            return{
                ...state,
                isLoading : false,
                data : null,
                done : -1,
            }
        default : 
        return state;
    }
}