import React,{useEffect,useContext,useState} from 'react';

import like from '../assets/heart.svg'; 
import profile from '../assets/person.svg'; 
import unlike from '../assets/unlikeheart.svg'
import {SnackbarContext} from '../contexts/snackbar';
import { useCookies } from 'react-cookie';
import {UtilsContext} from '../contexts/utils';

import '../App.css';

const Tweet = (props) => {
    
    const {options,optionsError,openSnackbar,openErrSnackbar} = useContext(SnackbarContext);

    const {editTweet,setEditTweet,editTweetContent,setEditTweetContent,editTweetLikes,setEditTweetLikes,loader,setLoader} = useContext(UtilsContext);
    const [cookies, setCookie] = useCookies();

    const [deleteTweetid,setDeleteTweetid] = useState(null);
    const [likeTweetid,setLikeTweetid] = useState(null);

    const [editData,setEditData] = useState({});


    const request= {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json','Authorization':'Token '+cookies.Token},
    };

    const requestEdit= {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json','Authorization':'Token '+cookies.Token},
    };

    const likeRequest = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json','Authorization':'Token '+cookies.Token},
        body: JSON.stringify(editData)
      };


    function deletePost(id){
        setDeleteTweetid(id);
    }

    function editPost(id,content,likes){
        setEditTweet(id);
        setEditTweetContent(content);
        setEditTweetLikes(likes);
    }

    function likePost(id,content,likes){
        setLikeTweetid(id);
        let data = {};
        data['content'] = content;
        data['likes'] = likes+1;
        setEditData(data);
    }

    useEffect(() => {
        if(deleteTweetid)
        {
            setLoader(true);
            fetch('https://twitter-clone-mukul.herokuapp.com/mytweet/delete/'+deleteTweetid+'/',request)
      .then(response => {
        console.log(response);
        if(response.status === 204)
        {
            setLoader(false);
          openSnackbar('Tweet deleted successfully');
        }
        else
        {
            openErrSnackbar('deletion unsuccessful');
        }
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
        setDeleteTweetid(null);
        }

        if(likeTweetid != null)
        {
            let data = {};
            data['content'] = document.getElementById('tweetContent').value;
            data['like'] = 
            fetch('https://twitter-clone-mukul.herokuapp.com/mytweet/update/'+likeTweetid+'/',likeRequest)
            .then(response => {
              console.log(response);
              const responseJson = response.json().then(data => {
              console.log(data); 
              if(response.status === 200)
              {
                  openSnackbar('liked!');
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
            setLikeTweetid(null);
        }
    },[deleteTweetid,likeTweetid])

    let time = props.upd;   
    let date = time.split('T');
    const Update_date = new Date(date[0]);
    let Update_time = new Date(time);
    return (
        <div className="tweet">
          <div className="aboveTweet">
            <div className="user" ><img  src={props.image == null ? profile : props.image} alt="profile" style={{height:'30px', width:'30px', display:'inline', margin:'auto'}}/>{props.user}</div>
            <div className="tweetTime">{ Update_time.toLocaleTimeString('en-US', { hour: 'numeric',minute:'numeric', hour12: true })}, {Update_date.toDateString()}</div>
            </div>
            <div className="tweetContent">{props.content}</div>
            {
                props.post_image ? <img  src={props.post_image} alt="image" style={{height:'400px', width:'400px', display:'inline', margin:'auto'}}/> : ''
            }
            <div className="likes"><img onClick={() => likePost(props.id,props.content,props.likes)} src={ props.likes > 0 ? like : unlike} alt="like" style={{height:'30px', width:'30px', display:'inline', margin:'auto'}}/>
            {props.likes > 0 ? props.likes+' people liked it' : ''}
            {
                cookies.Username === props.user ? <span><span onClick={() => deletePost(props.id)} className="deletebtn">delete</span> <span onClick={() => editPost(props.id,props.content,props.likes)} className="deletebtn">edit</span></span> : ''
            }
            </div>
        </div>
    );
}

export default Tweet;