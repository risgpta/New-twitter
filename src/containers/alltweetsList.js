import React,{useEffect,useState} from 'react';
import {fetchAllTweets} from '../actions/allTweetsListAction';
import { connect } from 'react-redux'

import '../App.css';

import Tweet from '../components/tweet';
import Loader from '../components/loader';

const AllTweetList = (props) => {
   
    const [tweets,setTweets] = useState(null);

    useEffect(() => {
        if(props.allTweets){
            setTweets(props.allTweets.message.tweets)
            console.log(props.allTweets);
        }
        else{
            props.fetchAllTweets();
        }
    },[props.allTweets]);

    useEffect(() => {
        console.log(props.success)
            if(props.success === 1)
            props.fetchAllTweets();
    },[props.success]);

   /* useEffect(() => {
        props.fetchAllTweets();
    },[props.update]);*/


    return(
         <div>
         {props.Loading === true ? <Loader/> : tweets ? tweets.map(tweet => {
        return <Tweet key={tweet._id} id={tweet._id} content={tweet.message} likes={tweet.likescount} upd={tweet.updatedAt} user={tweet.author} comm={tweet.commentscount} img={tweet.imagelinks}/>;
      }) : ''} 
    </div>
    );
    
}


const mapStateToProps = (state) => ({
    allTweets : state.allTweetsReducer.data,
    Loading : state.allTweetsReducer.isLoading,
    success : state.loginReducer.done, 
})

const mapDispatchToProps = (dispatch) => {
    return {
      fetchAllTweets: () => dispatch(fetchAllTweets()),
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(AllTweetList);
