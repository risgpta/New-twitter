import {CREATE_COMMENT_LOAD,CREATE_COMMENT_SUCCESS,CREATE_COMMENT_FAIL,READ_COMMENT_LOAD,READ_COMMENT_SUCCESS,READ_COMMENT_FAIL,UPD_COMMENT_LOAD,UPD_COMMENT_SUCCESS,UPD_COMMENT_FAIL,DEL_COMMENT_LOAD,DEL_COMMENT_SUCCESS,DEL_COMMENT_FAIL} from '../actions/types';

const initialState = {
    isLoading : false,
    data : null, 
    done: -1, 
}

export default function(state = initialState,action){
    switch(action.type){
        case CREATE_COMMENT_LOAD:
                return{
                    ...state,
                    isLoading : true,
                }
        case CREATE_COMMENT_SUCCESS:
                return{
                    ...state,
                    isLoading : false,
                    data:action.payload,
                    done:action.done,
                }
        case CREATE_COMMENT_FAIL:
                return{
                    ...state,
                    isLoading : false,
                    data:action.payload,
                    done:action.done,
                }
        case READ_COMMENT_LOAD:
                return{
                    ...state,
                    isLoading : true,
                }
        case READ_COMMENT_SUCCESS:
                return{
                    ...state,
                    isLoading : false,
                    data:action.payload,
                    done:action.done,
                }
        case READ_COMMENT_FAIL:
                return{
                    ...state,
                    isLoading : false,
                    data:action.payload,
                    done:action.done,
                }
        case UPD_COMMENT_LOAD:
                    return{
                        ...state,
                        isLoading : true,
                        done:action.done,
                    }
        case UPD_COMMENT_SUCCESS:
                    return{
                        ...state,
                        isLoading : false,
                        data:action.payload,
                        done:action.done,
                    }
        case UPD_COMMENT_FAIL:
                    return{
                        ...state,
                        isLoading : false,
                        data:action.payload,
                        done:action.done,
                    }
        case DEL_COMMENT_LOAD:
                    return{
                        ...state,
                        isLoading : true,
                    }
        case DEL_COMMENT_SUCCESS:
                    return{
                        ...state,
                        isLoading : false,
                        data:action.payload,
                        done:action.done,
                    }
        case DEL_COMMENT_FAIL:
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