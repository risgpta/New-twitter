import React,{useState,useEffect,useContext} from 'react';

import { useSnackbar } from 'react-simple-snackbar';


import {UtilsContext} from '../contexts/utils';

import '../App.css';

import MyTweetList from '../containers/mytweetList';
import TweetList from './tweetList';
import Loader from './loader';

const MainArea = () => {

  const {mytweet,editTweet,setEditTweet,editTweetContent,setEditTweetContent,editTweetLikes,setEditTweetLikes,loader,setLoader} = useContext(UtilsContext);
    const options = {
        position: 'bottom-right',
        style: {
          backgroundColor: '#336600',
          border: '2px solid #408000',
          color: 'white',
          fontSize: '20px',
          textAlign: 'center',
          borderRadius: '5px',
        },
        closeStyle: {
          color: 'white',
          fontSize: '16px',
        },
      }
      
      const optionsError = {
          position: 'bottom-right',
          style: {
            backgroundColor: '#cc3300',
            border: '2px solid #e63900',
            color: 'white',
            fontSize: '20px',
            textAlign: 'center',
            borderRadius: '5px',
          },
          closeStyle: {
            color: 'white',
            fontSize: '16px',
          },
        }
      
    const [openSnackbar, closeSnackbar] = useSnackbar(options);
    const [openErrSnackbar, closeErrSnackbar] = useSnackbar(optionsError);
    
    const [tweet,setTweet] = useState(null);
    const [editData,setEditData] = useState(null);

    const editRequest = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json','Authorization':'Token '+localStorage.getItem('twitter-token')},
      body: JSON.stringify(editData)
    };


    const postTweet = (e) =>{
        e.preventDefault();
        let data = {};
        let form_data = new FormData();
        form_data.append('content', document.getElementById('tweetContent').value);
        form_data.append('image', document.getElementById('postImage').files[0]);

        if(editTweetContent){
          data['likes'] = editTweetLikes;
            console.log(data);
            setEditData(data);
        }
        else{
          console.log(document.getElementById('postImage').files[0]);
          setTweet(form_data);
        }
    }

    const request = {
        method: 'POST',
        headers: {'Authorization':'Token '+localStorage.getItem('twitter-token')},
        body: tweet
      };
    
      useEffect(() => {
        if(tweet!=null)
        {
          setLoader(true);
          fetch('https://twitter-clone-mukul.herokuapp.com/mytweet/',request)
          .then(response => {
            console.log(response);
            if(response.status === 201)
            {
                console.log(response);
                setLoader(false);
                openSnackbar('POSTED!');
                document.getElementById('tweetContent').value = '';
                setTweet(null)
            }
            else
            {
                let res = '';
                console.log(response);
                for(let key in response)
                {
                    res=res+key+','+response[key]+'.';
                }
                openErrSnackbar(res);
            }
          })
          .catch(error => {
                console.log(error );
                let res = '';
                for(let key in error )
                {
                    res=res+key+','+error [key]+'.';
                }
                openErrSnackbar(res);
                console.error('There was an error!',error );
          });
        }

        if(editTweet !=null)
        { 
          document.getElementById('tweetContent').scrollIntoView({behavior:"smooth"})
          document.getElementById('tweetContent').value = editTweetContent;
        }

        if(editData !=null)
        {
          setLoader(true);
          fetch('https://twitter-clone-mukul.herokuapp.com/mytweet/update/'+editTweet+'/',editRequest)
          .then(response => {
            console.log(response);
            const responseJson = response.json().then(data => {
            console.log(data); 
            if(response.status === 200)
            {
                setLoader(false);
                openSnackbar('Edited!');
            }
            else
            {
                let res = '';
                for(let key in data)
                {
                    res=res+key+','+data[key]+'.';
                }
                openErrSnackbar(res);
            }
          })   
          })
          .catch(error => {
            const responseJson = error.json().then(data => {
                console.log(data);
                let res = '';
                for(let key in data)
                {
                    res=res+key+','+data[key]+'.';
                }
                openErrSnackbar(res);
                console.error('There was an error!', data);
              })
          });
          setEditTweet(null);
          setEditTweetContent(null);
          setEditData(null);
          setEditTweetLikes(null);
          document.getElementById('tweetContent').value = '';
        }

      },[tweet,mytweet,editTweet,editData])


    //if(!localStorage.getItem('twitter-token'))
    //return <Redirect to='/'/>
    return(
        <div id="main" className="mainArea">
          <Loader/>
            <form>
            <textarea id="tweetContent" name="content" rows="5"  placeholder="What's happening?" className="textArea"></textarea>
            <input type="file"
                   id="postImage"
                    />
            <input className="smallbtn2" onClick={e => postTweet(e)} type="submit" value={editTweetContent ? 'Edit Tweet' : 'Tweet'}/>
            </form>
            {mytweet ? <MyTweetList/> : <TweetList/>}
            
        </div>
    );
}

export default MainArea;
