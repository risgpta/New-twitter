import React,{useState,useEffect} from 'react';
import ProfilePic from '../components/profilePic'
import addPicture from '../assets/target.svg'
import addVideo from '../assets/screen-player.svg'
import cut from '../assets/delete.svg'
import { connect } from 'react-redux'
import Loader from '../components/loader';
import {goToProfile} from '../actions/miscAction'
import '../App.css';

import {createTweet} from '../actions/tweetAction';
import {fetchProfile} from '../actions/profileAction';

const TweetBox = (props) => {

    const [data,setData] = useState(null);

    const [multi,setMulti] = useState(null);

    const [rtdb,setRtdb] = useState(null);

    const postTweet = (e) => {
        e.preventDefault();
        let form_data = new FormData();

        form_data.append('message', data['message']);

        if(multi === 'img')
        {
            console.log(data['imagelinks'])
            for(let i=0;i< data['imagelinks'].length;i++)
            {
                console.log(data['imagelinks'][i])
                form_data.append('imagelinks',data['imagelinks'][i]);
            }
        }
        else if(multi === 'vid')
        {
            form_data.append('videolinks', data['videolinks']);
        }
        
        console.log(form_data);
        let putdata = {
            data : form_data,
            token : localStorage.getItem('twitter-token'),
        }
        props.createTweet(putdata);
    }

    const change = (key,value) => {
        console.log(key);
        console.log(value);
        setData({
            ...data,
            [key] : value,
        })
    }

    const gotoprofile = () => {
        props.goToProfile(props.profile);
    }

    console.log(data);

    return(
        <div className="tweetbox">
            {props.Loading === true ? 
            <Loader/>
            :
            localStorage.getItem('username') === null || localStorage.getItem('username') === undefined  ? 
            <h3 style={{fontFamily: 'Avenir-Medium',margin: 'auto',color: '#073f63'}}>Login to start tweeting!</h3>
            :
            <div>
            <div style={{display:'flex'}}>
             <div style={{cursor:'pointer'}} onClick={() => gotoprofile()}>
            <ProfilePic image={localStorage.getItem('userPic')}/>
            </div>
            <form class="tweetboxform">
            <textarea id="tweetContent" onChange={(e) => change("message",e.target.value)} name="content" rows="5" cols="30" placeholder="What's happening?" className="textArea"></textarea>
            </form>
            </div>
            {
                data && data.imagelinks && data.imagelinks.length > 0 && multi === 'img'?
                <img className="tweetPostImage" src={URL.createObjectURL(data.imagelinks[0])} />
                :
                ''
            }
            {
                data && data.imagelinks && data.imagelinks.length > 1 && multi === 'img'?
                <img className="tweetPostImage" src={URL.createObjectURL(data.imagelinks[1])} />
                :
                ''
            }
            {
                data && data.imagelinks && data.imagelinks.length > 2 && multi === 'img'?
                <img className="tweetPostImage" src={URL.createObjectURL(data.imagelinks[2])} />
                :
                ''
            }
            {
                data && data.videolinks &&  multi === 'vid'?
                <video className="videoDiv"controls>
                <source src={URL.createObjectURL(data.videolinks)} />
                </video>
                :
                ''
            }
            <div>
                <div onClick={() => setMulti(null)} style={{position:'relative',top:'60px',left:'400px'}}>
                {
                    multi ?
                    <img src={cut} className="multibtn"/>
                    :
                    ''
                }
                </div>
            <input type="file"
                   id="postImage"
                   className = "imageUpload"
                   onChange ={(e) => change("imagelinks",e.target.files)}
                   multiple
                    />
            <label onClick={() => setMulti('img')} style={multi === 'vid' ? {pointerEvents: 'none',opacity: '0.35'} : {}} className="uploadImage" htmlFor="postImage"><img src={addPicture} className="multibtn"/></label>
            <input type="file"
                   id="postVideo"
                   className = "imageUpload"
                   onChange ={(e) => change("videolinks",e.target.files[0])}
                    />
            <label onClick={() => setMulti('vid')}  style={multi === 'img' ? {pointerEvents: 'none',opacity: '0.35'} : {}}  className="uploadImage" htmlFor="postVideo"><img src={addVideo}  className="multibtn"/></label>
            <input className="smallbtn2" onClick={e => postTweet(e)}  type="submit" value={'Tweet'}/>
            </div>
            </div>
             }
        </div>
    );
}


const mapStateToProps = (state) => ({
    Loading : state.tweetReducer.isLoading,
    LoginLoading : state.loginReducer.isLoading,
    success : state.loginReducer.done,
    LoginData : state.loginReducer.data, 
    profile : state.miscActionReducer.profile,
})

const mapDispatchToProps = (dispatch) => {
    return {
      createTweet: (payload) => dispatch(createTweet(payload)),
      goToProfile: (payload) => dispatch(goToProfile(payload)),
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(TweetBox);
