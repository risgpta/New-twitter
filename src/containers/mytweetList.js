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
     return <Tweet key={tweet._id} id={tweet._id} content={tweet.message} likes={tweet.likescount} upd={tweet.updatedAt} user={tweet.author} comm={tweet.commentscount} img={tweet.imagelinks}/>;
      }) : ''} 
    </div>
    );
    
}


const mapStateToProps = (state) => ({
    myTweets : state.myTweetsReducer.data,
    Loading : state.myTweetsReducer.isLoading,
})

const mapDispatchToProps = (dispatch) => {
    return {
      fetchMyTweets: () => dispatch(fetchMyTweets()),
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(MyTweetList);
