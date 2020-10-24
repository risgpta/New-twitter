import {INCREMENT} from '../actions/types';

const initialState = {
    count : 1
}

export default function(state = initialState,action){
    switch(action.type){
        case INCREMENT:
                console.log('reducer..');
                return{
                    ...state,
                    count : action.payload
                }
        default : 
        return state;
    }
}