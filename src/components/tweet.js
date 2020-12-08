import React,{useEffect,useState,useRef} from 'react';

import like from '../assets/heart.svg'; 
import profile from '../assets/person.svg'; 
import unlike from '../assets/unlikeheart.svg'

import { connect } from 'react-redux';
import {deleteTweet,updateTweet} from '../actions/tweetAction';
import {likeTweet,fetchLikeList} from '../actions/likeAction';

import '../App.css';

const Tweet = (props) => {
    
    

    const inputRef = useRef(null);

    const [deleteTweetid,setDeleteTweetid] = useState(null);

    const [data,setData] = useState(null);
    const [editTweetid,setEditTweetid] = useState(null);
    const [edit,setEdit] = useState(false);

    const [imgV,setImgV] = useState(0);

    const [showopt,setshowopt] = useState(false);

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
            id:id,
            body : JSON.stringify({
                flag: props.like_flag ? -1 : 1,
                _id : id,
            }),
        }
        props.likeTweet(putdata);
    }

    useEffect(()=>{
        setData({
            message : props.content,
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
                token : localStorage.getItem('token'),
                tweet_id:deleteTweetid,
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
                token : localStorage.getItem('token'),
                tweet_id:editTweetid,
                body : JSON.stringify(data),
            }
            props.updateTweet(putdata);   
            setEditTweetid(null);
            setEdit(false);
        }
    },[editTweetid]);

    useEffect(() => {
        if(props.Likelist === null && localStorage.getItem('username'))
        {
            let data = {
                tweet_id:props.id,
            }
            props.fetchLikeList(data);
        }
    },[props.Likelist])

    let time = props.upd || '';   
    let date = time.split('T');
    const Update_date = new Date(date[0]);
    let Update_time = new Date(time);

    let image_item = [];

    if(props.img && props.img.length)
    {
        for(let i=0; i<props.img.length; i++)
        {
            image_item.push(
                imgV === i ?
                <img  src={props.img[i]} alt="image" className="tweetPostImage"/> 
                :
                ''
            );
        }
    }

    let vid_item = [];

    if(props.vid)
    {
        vid_item.push(<video className="videoDiv"controls>
        <source src={props.vid} />
        </video>)
    }

    const Options = () => {
        return (
            <div>
                <div className="dropdown">
                <button onClick={() => setshowopt(!showopt)} className="dropbtn">...</button>
                <div className="dropdown-content">
                {
                    showopt === true ?
                    <div>
                    {
                        localStorage.getItem('userid') === props.userid? 
                        <span><div onClick={() => deletePost(props.id)} className="deletebtn">delete</div> <div onClick={edit === true ? () => editPost(props.id) : () => {setEdit(true)}} className="deletebtn">{edit === true ? 'save' : 'edit'}</div></span> 
                        : 
                        <div className="deletebtn">report</div>
                    }
                    </div>
                    :
                    ''
                }
                </div>
                </div>
            </div>
        )
    }

    return (
        <div className="tweet">
          <div className="aboveTweet">
            <div className="user" ><img  src={props.pimg === null ? profile : props.pimg} alt="profile" className="usertweetpic" />{props.user}</div>
            <div className="tweetTime">{ Update_time.toLocaleTimeString('en-US', { hour: 'numeric',minute:'numeric', hour12: true })} · {Update_date.toLocaleDateString('en-US', {day: 'numeric',month: 'short',year: 'numeric'})}</div>
            <Options/>
            </div>
            <div className="mainTweet">
            {
                edit === true ?
                <input ref={inputRef} onChange={(e) => change("message",e.target.value)} className="mainTweet editTweetcontent" value={data.message}/>
                :
                <div className="tweetContent">{props.content}</div>
            }
            {
                image_item
            }
            {
                image_item.length > 1 ?
                <span className="slideImage">
                {
                    imgV === 1 || imgV === 2 ?
                    <a onClick={() => setImgV(imgV-1)} class="prev" >&#10094;</a>
                    :
                    ''
                }
                {
                    imgV === 0 || imgV === 1 && image_item.length > 2 ?
                    <a onClick={() => setImgV(imgV+1)} class="next" >&#10095;</a>
                    :
                    ''
                }
                </span>
                :
                ''
            }
            {/*
                image_item.length > 1?
                <span>{imgV+1}/{image_item.length}</span>
                :
                ''
            */
            }
            {
                vid_item
            }
            </div>
            <div className="likes"><img  onClick={() => likePost(props.id)}  src={ props.like_flag === true ? like : unlike} alt="like" style={{height:'30px', width:'30px', display:'inline', margin:'auto',cursor:'pointer'}}/>
            {props.likes > 0 ? props.likes+' people liked it' : 'Be the first to like this'}
            {props.comm > 0 ? props.comm+' people commented on it' : 'Be the first to comment on this'}
            </div>
        </div>
    );
}



const mapStateToProps = (state) => ({
    Loading : state.tweetReducer.isLoading,
    Likelist : state.likeReducer.data,
})

const mapDispatchToProps = (dispatch) => {
    return {
      deleteTweet: (payload) => dispatch(deleteTweet(payload)),
      updateTweet: (payload) => dispatch(updateTweet(payload)),
      likeTweet: (payload) => dispatch(likeTweet(payload)),
      fetchLikeList: (payload) => dispatch(fetchLikeList(payload)),
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Tweet);