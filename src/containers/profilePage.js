
import React,{useEffect,useState} from 'react';
import {fetchProfile,updateProfile} from '../actions/profileAction';
import '../App.css';

import email from '../assets/email.svg'
import { connect } from 'react-redux'
import Loader from '../components/loader';
import MyTweetList from './mytweetList';

import addPicture from '../assets/target.svg'


const ProfilePage = (props) => {
   
    const [profile,setProfile] = useState(null);
    const [edit,setEdit] = useState(false);
    const [data,setData] = useState(null);
    

    useEffect(() => {
        if(props.profile){
            setProfile(props.profile.profile)
            setData({
                ...data,
                bio : props.profile.profile? props.profile.profile.bio : '',
            });
            console.log(props.profile);
        }
        else{
            const data = {
              username : localStorage.getItem('username'),
            }
            props.fetchProfile(data);
        }
    },[props.profile]);

    useEffect(()=>{

    },[edit,data]);

    const editProfile = () => {
        setEdit(true);
    }

    const saveProfile = () => {
        let form_data = new FormData();
        for(let key in data)
        {
            form_data.append(key, data[key]);
        }
        console.log(form_data);
        let putdata = {
            data : form_data,
            token : localStorage.getItem('twitter-token'),
            username : localStorage.getItem('username'),
        }
        props.updateProfile(putdata);
        setEdit(false);
        const d = {
            username : localStorage.getItem('username'),
          }
          props.fetchProfile(d);
    }

    const change = (key,value) => {
        setData({
            ...data,
            [key] : value,
        })
    }

    return(
         <div>
         {
         props.Loading === true ? <Loader/> :  profile === null ? '' : 
           
            <div className="profileDiv">
            {
                edit == false ?
                <img className="profilePicProfile" src={profile ? profile.profilePic : ''}/>
                :
                <div>
                <img className="profilePicProfile" src={profile ? profile.profilePic : ''}/>
                <input type="file"
                       id="postImage"
                       className = "imageUpload"
                       onChange ={(e) => change("profilePic",e.target.files[0])}
                        />
                <label className="uploadImageProfile" htmlFor="postImage"><img src={addPicture} style={{height:'30px', width:'30px', display:'inline', margin:'auto'}}/></label>
                </div>
            }
            <div>
            <div className="profileName">{localStorage.getItem('name')}</div>
            <div className="profileUsername">@{localStorage.getItem('username')}</div>
            <div className="profileEmail"> <img src={email} style={{height:'20px', width:'20px', display:'inline', margin:'auto',verticalAlign:'middle'}} />  {localStorage.getItem('email')}</div>
            {
                edit === false ?
                <div>{profile === null ? <div className="bio"> Tell us about yourself</div> : <div className="bio" >{profile.bio}</div>}</div>
                :
                <div><input className="bioInput" onChange={(e) => change("bio",e.target.value)} value={data === null ? '' : data.bio} type="text" placeholder="Tell us about yourself..."/></div>
            }
            <div className="follow">
                <div><span>{profile.following}</span>Following</div>
                <div><span>{profile.followers}</span>Followers </div>
            </div>
        <div className="editbtn" onClick={() => {edit === false ? editProfile() : saveProfile() }}>{ edit === false ? 'edit' : 'save'}</div>
            </div>
            </div>
         }
         <MyTweetList/>
        </div>
    );
    
}


const mapStateToProps = (state) => ({
    profile : state.profileReducer.data,
    Loading : state.profileReducer.isLoading
})

const mapDispatchToProps = (dispatch) => {
    return {
      fetchProfile: (payload) => dispatch(fetchProfile(payload)),
      updateProfile: (payload) => dispatch(updateProfile(payload)),
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(ProfilePage);
