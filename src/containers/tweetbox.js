import React,{useState,useEffect} from 'react';
import ProfilePic from '../components/profilePic'
import addPicture from '../assets/add.svg'
import { connect } from 'react-redux'
import Loader from '../components/loader';
import { useCookies } from 'react-cookie';
import {goToProfile} from '../actions/miscAction'
import '../App.css';

import {createTweet} from '../actions/tweetAction';

const TweetBox = (props) => {

    const [data,setData] = useState(null);
    const [cookies, setCookie] = useCookies();

    useEffect(()=>{

    },[data]);

    const postTweet = (e) => {
        e.preventDefault();
        let form_data = new FormData();
        for(let key in data)
        {
            form_data.append(key, data[key]);
        }
        console.log(form_data);
        let putdata = {
            data : form_data,
            token : cookies.Token,
        }
        props.createTweet(putdata);
    }

    const change = (key,value) => {
        setData({
            ...data,
            [key] : value,
        })
    }

    const gotoprofile = () => {
        props.goToProfile(props.profile);
    }

    return(
        <div className="tweetbox">
            {props.Loading === true ? 
            <Loader/>
            :
            cookies.Username === null || cookies.Username === undefined  ? 
            <h3>Login to start tweeting!</h3>
            :
            <div style={{display:'flex'}}>
             <div style={{cursor:'pointer'}} onClick={() => gotoprofile()}>
            <ProfilePic />
            </div>
            <form class="tweetboxform">
            <textarea id="tweetContent" onChange={(e) => change("content",e.target.value)} name="content" rows="5" cols="30" placeholder="What's happening?" className="textArea"></textarea>
            <div></div>
            <input type="file"
                   id="postImage"
                   className = "imageUpload"
                   onChange ={(e) => change("image",e.target.files[0])}
                    />
            <label className="uploadImage" htmlFor="postImage"><img src={addPicture} style={{height:'30px', width:'30px', display:'inline', margin:'auto'}}/></label>
            <input className="smallbtn2" onClick={e => postTweet(e)}  type="submit" value={'Tweet'}/>
            </form>
            </div>
            }
        </div>
    );
}


const mapStateToProps = (state) => ({
    Loading : state.tweetReducer.isLoading,
})

const mapDispatchToProps = (dispatch) => {
    return {
      createTweet: (payload) => dispatch(createTweet(payload)),
      goToProfile: (payload) => dispatch(goToProfile(payload)),
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(TweetBox);
