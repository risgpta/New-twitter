import {INCREMENT} from './types';
export const  increment = (count) => dispatch => {
    console.log('action..');
     dispatch({
            type:INCREMENT,
            payload : count*2,
        });
}