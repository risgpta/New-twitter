import React from 'react';
import '../App.css';
import TweetBox from './tweetbox';
import AllTweetList from './alltweetsList';
import { connect } from 'react-redux';
import MyTweetList from './mytweetList';
import ProfilePage from './profilePage';
import Loader from '../components/loader';

const MainLayout = (props) => {

  return(

        <div className="mainArea">
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
    Loading : state.tweetReducer.isLoading, 
    success : state.loginReducer.done, 
});
  
const mapDispatchToProps = (dispatch) => {
    return {
      
    };
  };
  
export default connect(mapStateToProps,mapDispatchToProps)(MainLayout);