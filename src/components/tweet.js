import React,{useEffect,useContext,useState,useRef} from 'react';

import like from '../assets/heart.svg'; 
import profile from '../assets/person.svg'; 
import unlike from '../assets/unlikeheart.svg'
import {SnackbarContext} from '../contexts/snackbar';
import { useCookies } from 'react-cookie';
import {UtilsContext} from '../contexts/utils';

import { connect } from 'react-redux';
import {deleteTweet,updateTweet} from '../actions/tweetAction';

import '../App.css';

const Tweet = (props) => {
    
    const [cookies, setCookie] = useCookies();

    const inputRef = useRef(null);

    const [deleteTweetid,setDeleteTweetid] = useState(null);

    const [data,setData] = useState(null);
    const [editTweetid,setEditTweetid] = useState(null);
    const [edit,setEdit] = useState(false);

    function deletePost(id){
        setDeleteTweetid(id);
    }

    function editPost(id)
    {
        setEditTweetid(id);
    }

    function likePost(id)
    {
        let putdata = {
            token : cookies.Token,
            id:id,
            body : JSON.stringify({
                ...data,
                likes : props.likes+1,
            }),
        }
        setData({
            ...data,
            likes : props.likes+1,
        })
        props.updateTweet(putdata);
    }

    useEffect(()=>{
        setData({
            content : props.content,
            likes : props.likes,
        })
    },[]);

    const change = (key,value) => {
        setData({
            ...data,
            [key] : value,
        })
    }

    useEffect(()=>{
        if(edit === true)
        {
            inputRef.current.focus();
        }
    },[edit]);
    
    useEffect(() => {
        if(deleteTweetid !== null)
        {
            let data = {
                token : cookies.Token,
                id:deleteTweetid,
            }
            props.deleteTweet(data);   
            setDeleteTweetid(null);
        }
    },[deleteTweetid]);

    useEffect(() => {

    },[data]);

    useEffect(() => {
        if(editTweetid !== null)
        {
            let putdata = {
                token : cookies.Token,
                id:editTweetid,
                body : JSON.stringify(data),
            }
            props.updateTweet(putdata);   
            setEditTweetid(null);
            setEdit(false);
        }
    },[editTweetid]);


    let time = props.upd;   
    let date = time.split('T');
    const Update_date = new Date(date[0]);
    let Update_time = new Date(time);
    return (
        <div className="tweet">
          <div className="aboveTweet">
            <div className="user" ><img  src={props.image == null ? profile : props.image} alt="profile" style={{height:'30px', width:'30px', display:'inline', margin:'auto',borderRadius:'50%',verticalAlign: 'middle'}}/>{props.user}</div>
            <div className="tweetTime">{ Update_time.toLocaleTimeString('en-US', { hour: 'numeric',minute:'numeric', hour12: true })}, {Update_date.toDateString()}</div>
            </div>
            <div className="mainTweet">
            {
                edit === true ?
                <input ref={inputRef} onChange={(e) => change("content",e.target.value)} className="mainTweet editTweetcontent" value={data.content}/>
                :
                <div className="tweetContent">{props.content}</div>
            }
            {
                props.post_image ? <img  src={props.post_image} alt="image" className="tweetPostImage"/> : ''
            }
            </div>
            <div className="likes"><img  onClick={() => likePost(props.id)}  src={ props.likes > 0 ? like : unlike} alt="like" style={{height:'30px', width:'30px', display:'inline', margin:'auto'}}/>
            {props.likes > 0 ? props.likes+' people liked it' : 'Be the first to like this'}
            {
                cookies.Username === props.user ? <span><span onClick={() => deletePost(props.id)} className="deletebtn">delete</span> <span onClick={edit === true ? () => editPost(props.id) : () => {setEdit(true)}} className="deletebtn">{edit === true ? 'save' : 'edit'}</span></span> : ''
            }
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    Loading : state.tweetReducer.isLoading,
})

const mapDispatchToProps = (dispatch) => {
    return {
      deleteTweet: (payload) => dispatch(deleteTweet(payload)),
      updateTweet: (payload) => dispatch(updateTweet(payload)),
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Tweet);