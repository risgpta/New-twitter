import React,{useEffect,useState,useRef} from 'react';
import {fetchAllTweets} from '../actions/allTweetsListAction';
import { connect } from 'react-redux'
import {getUserData,getUsernameData} from '../actions/miscAction'
import '../App.css';

import Tweet from '../components/tweet';
import Loader from '../components/loader';

const AllTweetList = (props) => {
   
    const [tweets,setTweets] = useState([]);
    const [atweets,setaTweets] = useState([]);

    const [users,setUsers] = useState({});
    const [usersname,setUsersname] = useState({});

    const [page,setPage] = useState(1);

    useEffect(() => {
        if(props.tweets){
                    console.log(props.tweets.length);
                setTweets([...tweets,...props.tweets]);
                console.log([...tweets,...props.tweets]);
                //taking data from users
                let userData = props.users || [];
                let user_data = {...users};
                let username_data = {...usersname};
                for(let item of userData)
                {
                    user_data[item._id] = {
                        "name" : item.name,
                        "username" : item.username,
                        "profilePic" : item.profile.profilePic,
                    }

                    username_data[item.username] = item._id;

                }
                console.log(user_data);
                setUsers(user_data);
                props.getUserData(user_data);
                props.getUsernameData(username_data);
        }
    
    },[props.tweets]);

    useEffect(() => {
        //console.log(props.success)
            if(props.success === 1)
            props.fetchAllTweets(1);
    },[props.success]);

    useEffect(() => {
        setTweets([]);
        props.fetchAllTweets(1);
        console.log('upadting...')
        console.log(props.update)
    },[props.update,props.doneLike]);

    useEffect(() => {
        if(props.load === true)
        {
            setPage(page+1);
            props.fetchAllTweets(page+1);
            
        }
    },[props.load]);


    return(
         <div style={{marginBottom : '100px'}} >
         { tweets ? tweets.map(tweet => {
        return <div key={tweet._id}> 
        <Tweet key={tweet._id} id={tweet._id} userid={tweet.author} content={tweet.message} like_flag={tweet.like_flag} likes={tweet.likescount} upd={tweet.createdAt} pimg={users[tweet.author] ? users[tweet.author].profilePic : ''} user={users[tweet.author] ? users[tweet.author].name : ''} comm={tweet.commentscount} vid={tweet.videolinks} img={tweet.imagelinks}/>
        </div>;
        }) : <Loader/>}
        {props.Loading  && <Loader/>} 
        </div>
    );
    
}


const mapStateToProps = (state) => ({
    tweets : state.allTweetsReducer.tweets,
    users : state.allTweetsReducer.users,
    Loading : state.allTweetsReducer.isLoading,
    success : state.loginReducer.done, 
    update : state.tweetReducer.done,
    load : state.miscActionReducer.load,
    doneLike : state.likeReducer.flag,
})

const mapDispatchToProps = (dispatch) => {
    return {
      fetchAllTweets: (payload) => dispatch(fetchAllTweets(payload)),
      getUserData: (payload) => dispatch(getUserData(payload)),
      getUsernameData: (payload) => dispatch(getUsernameData(payload)),
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(AllTweetList);
