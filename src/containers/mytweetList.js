import React,{useEffect,useState} from 'react';
import {fetchMyTweets} from '../actions/myTweetsListAction';
import { connect } from 'react-redux'

import '../App.css';

import Tweet from '../components/tweet';
import Loader from '../components/loader';


const MyTweetList = (props) => {
   
    const [tweets,setTweets] = useState(null);
    

    useEffect(() => {
        if(props.myTweets){
            setTweets(props.myTweets.message)
            console.log(props.myTweets.message)
        }
        else{
            props.fetchMyTweets();
        }
    },[props.myTweets]);

    


    return(
        <div>
        {props.Loading === true ? <Loader/> : tweets ? tweets.map(tweet => {
       return <Tweet key={tweet._id} id={tweet._id} userid={tweet.author} content={tweet.message} likes={tweet.likescount} upd={tweet.updatedAt} pimg={props.Users[tweet.author].profilePic} user={props.Users[tweet.author].name} comm={tweet.commentscount} vid={tweet.videolinks} img={tweet.imagelinks}/>;
     }) : ''} 
   </div>
    );
    
}


const mapStateToProps = (state) => ({
    myTweets : state.myTweetsReducer.data,
    Loading : state.myTweetsReducer.isLoading,
    Users : state.miscActionReducer.userData,
})

const mapDispatchToProps = (dispatch) => {
    return {
      fetchMyTweets: () => dispatch(fetchMyTweets()),
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(MyTweetList);
