import {GET_PROFILE_LOAD,GET_PROFILE_SUCCESS,GET_PROFILE_FAIL,UPD_PROFILE_LOAD,UPD_PROFILE_SUCCESS,UPD_PROFILE_FAIL} from '../actions/types';

const initialState = {
    isLoading : false,
    data : null,  
}

export default function(state = initialState,action){
    switch(action.type){
        case GET_PROFILE_LOAD:
                return{
                    ...state,
                    isLoading : true,
                }
        case GET_PROFILE_SUCCESS:
                return{
                    ...state,
                    isLoading : false,
                    data:action.payload,
                }
        case GET_PROFILE_FAIL:
                return{
                    ...state,
                    isLoading : false,
                    data:action.payload,
                }
        case UPD_PROFILE_LOAD:
                    return{
                        ...state,
                        isLoading : true,
                    }
        case UPD_PROFILE_SUCCESS:
                    return{
                        ...state,
                        isLoading : false,
                        data:action.payload,
                    }
        case UPD_PROFILE_FAIL:
                    return{
                        ...state,
                        isLoading : false,
                        data:action.payload,
                    }
        default : 
        return state;
    }
}