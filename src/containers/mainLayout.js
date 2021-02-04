import React from 'react';
import '../App.css';
import TweetBox from './tweetbox';
import AllTweetList from './alltweetsList';
import { connect } from 'react-redux';
import MyTweetList from './mytweetList';
import ProfilePage from './profilePage';
import Loader from '../components/loader';
import { loadData } from '../actions/miscAction';

const MainLayout = (props) => {

  const handleScroll = (e) => {
    if(e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight && props.tweets.length > 0)
    {
      console.log('end');
      props.loadData(props.load);
    }
}

  return(

        <div className="mainArea" onScroll={(e) => handleScroll(e)}>
          {
             props.Loading === true ?
             <Loader/> 
             :
            props.profile === false ?
            <div>
            <TweetBox/>
            {props.flag ?
            <AllTweetList/>
            :
            <MyTweetList/>
            }
            <div style={{padding:'50px'}}></div>
            </div>
            :
            <ProfilePage/>
          }
        </div>
    );
}


const mapStateToProps = (state) => ({
    flag : state.miscActionReducer.flag,
    profile : state.miscActionReducer.profile,
    //Loading : state.tweetReducer.isLoading, 
    success : state.loginReducer.done, 
    //load : state.miscActionReducer.load,
    //tweets : state.allTweetsReducer.tweets,
    //update : state.tweetReducer.done, 
    data: state.loginReducer.data, 
});
  
const mapDispatchToProps = (dispatch) => {
    return {
      loadData: (payload) => dispatch(loadData(payload)),
    };
  };
  
export default connect(mapStateToProps,mapDispatchToProps)(MainLayout);