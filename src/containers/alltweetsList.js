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
            setTweets(props.allTweets)
            console.log(props.allTweets);
        }
        else{
            props.fetchAllTweets();
        }
    },[props.allTweets,props.Loading,tweets]);

    useEffect(() => {
        props.fetchAllTweets();
    },[props.update]);


    return(
         <div>
         {props.Loading === true ? <Loader/> : tweets === null ? '' : tweets.slice(0).reverse().map(tweet => {
        return <Tweet key={tweet.id} id={tweet.id} content={tweet.content} likes={tweet.likes} upd={tweet.updation_date} user={tweet.user.username} image={tweet.profile_image} post_image={tweet.image}/>;
      })}
    </div>
    );
    
}


const mapStateToProps = (state) => ({
    allTweets : state.allTweetsReducer.data,
    Loading : state.allTweetsReducer.isLoading,
    update : state.tweetReducer.isLoading,
})

const mapDispatchToProps = (dispatch) => {
    return {
      fetchAllTweets: () => dispatch(fetchAllTweets()),
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(AllTweetList);
