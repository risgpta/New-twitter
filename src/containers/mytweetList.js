import React,{useEffect,useState} from 'react';
import {fetchMyTweets} from '../actions/myTweetsListAction';
import { connect } from 'react-redux'

import '../App.css';

import Tweet from '../components/tweet';
import Loader from '../components/loader';
import { useCookies } from 'react-cookie';

const MyTweetList = (props) => {
   
    const [tweets,setTweets] = useState(null);
    const [cookies, setCookie] = useCookies();

    useEffect(() => {
        if(props.myTweets){
            setTweets(props.myTweets)
        }
        else{
            const data = {
              token : cookies.Token,
            }
            props.fetchMyTweets(data);
        }
        console.log(props.myTweets);
    },[props.myTweets,props.Loading,tweets]);

    useEffect(() => {
      const data = {
        token : cookies.Token,
      }
      props.fetchMyTweets(data);
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
    myTweets : state.myTweetsReducer.data,
    Loading : state.myTweetsReducer.isLoading,
    update : state.tweetReducer.isLoading,
})

const mapDispatchToProps = (dispatch) => {
    return {
      fetchMyTweets: (payload) => dispatch(fetchMyTweets(payload)),
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(MyTweetList);
