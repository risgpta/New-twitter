import {combineReducers} from 'redux';
import postReducer from './postReducer';
import incrementReducer from './incrementReducer';
import allTweetsReducer from './allTweetsListReducer';
import myTweetsReducer from './myTweetsListReducer';
import loginReducer from './loginReducer';
import signupReducer from './signupReducer';
import miscActionReducer from './miscActionReducer';
import profileReducer from './profileReducer'; 
import tweetReducer from './tweetReducer';

export default combineReducers({
   posts: postReducer, 
   counter : incrementReducer,
   allTweetsReducer,
   loginReducer,
   signupReducer,
   myTweetsReducer,
   miscActionReducer,
   profileReducer,
   tweetReducer,
});