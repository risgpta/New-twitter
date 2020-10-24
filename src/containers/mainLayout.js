import React,{useEffect,useState} from 'react';
import '../App.css';
import TweetBox from './tweetbox';
import AllTweetList from './alltweetsList';
import { connect } from 'react-redux';
import MyTweetList from './mytweetList';
import ProfilePage from './profilePage';
import Loader from '../components/loader';

const MainLayout = (props) => {

  const [update,setUpdate] = useState(false);

    useEffect(()=>{
      console.log('main');
      setUpdate(props.Loading)
    },[props.flag,props.profile,props.Loading]);

    useEffect(() => {

    });

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
  })
  
const mapDispatchToProps = (dispatch) => {
    return {
      
    };
  };
  
export default connect(mapStateToProps,mapDispatchToProps)(MainLayout);