import React,{useEffect,useState} from 'react';
import {fetchAllTweets} from '../actions/allTweetsListAction';
import { connect } from 'react-redux'
import {getUserData} from '../actions/miscAction'
import '../App.css';

import Tweet from '../components/tweet';
import Loader from '../components/loader';

const AllTweetList = (props) => {
   
    const [tweets,setTweets] = useState(null);

    const [users,setUsers] = useState(null);

    useEffect(() => {
        if(props.allTweets){
            setTweets(props.allTweets.message.tweets)
            console.log(props.allTweets);

            //taking data from users
            let userData = props.allTweets.message.users || [];
            let user_data = {};

            for(let item of userData)
            {
                user_data[item._id] = {
                    "name" : item.name,
                    "username" : item.username,
                    "profilePic" : item.profile.profilePic,
                }
            }

            console.log(user_data);
            setUsers(user_data);
            props.getUserData(user_data);
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

    useEffect(() => {
        props.fetchAllTweets();
    },[props.update]);


    return(
         <div style={{marginBottom : '100px'}}>
         {props.Loading === true ? <Loader/> : tweets ? tweets.map(tweet => {
        return <Tweet key={tweet._id} id={tweet._id} userid={tweet.author} content={tweet.message} like_flag={tweet.like_flag} likes={tweet.likescount} upd={tweet.createdAt} pimg={users[tweet.author].profilePic} user={users[tweet.author].name} comm={tweet.commentscount} vid={tweet.videolinks} img={tweet.imagelinks}/>;
      }) : ''} 
    </div>
    );
    
}


const mapStateToProps = (state) => ({
    allTweets : state.allTweetsReducer.data,
    Loading : state.allTweetsReducer.isLoading,
    success : state.loginReducer.done, 
    update : state.tweetReducer.isLoading,
})

const mapDispatchToProps = (dispatch) => {
    return {
      fetchAllTweets: () => dispatch(fetchAllTweets()),
      getUserData: (payload) => dispatch(getUserData(payload)),
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(AllTweetList);
