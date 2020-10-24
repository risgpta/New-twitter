import {FETCH_POSTS, NEW_POST} from './types';

export const  fetchPosts = () => dispatch => {
    console.log('action..');
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res  => res.json())
        .then(items => dispatch({
            type:FETCH_POSTS,
            payload : items
        }))
}