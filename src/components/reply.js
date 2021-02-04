import React,{useEffect,useState} from 'react';
import { connect } from 'react-redux';
import {createComment,updateComment,deleteComment} from '../actions/commentAction';

const Replies = (props) =>{

    const [reply,setReply] = useState(false);
    const [edit,setEdit] = useState(null);

    useEffect(() => {
        console.log(props.commentId);
    });

    const postReply = () => {

        let putdata = {
            data : JSON.stringify({
                text : reply,
            }),
            token : localStorage.getItem('twitter-token'),
            threadlevel : 1,
            _id : props.tweetId,
            parentid : props.commentId,
        }
        props.createComment(putdata);
    }

    const editComment = (id) => {
        let putdata = {
            data : JSON.stringify({
                text : reply,
            }),
            token : localStorage.getItem('twitter-token'),
            _id : props.tweetId,
            commentid : id,
        }
        props.updateComment(putdata);
        setEdit(null);
    }

    const delComment = (id) => {
        let putdata = {
            data : JSON.stringify({
                text : reply,
            }),
            token : localStorage.getItem('twitter-token'),
            _id : props.tweetId,
            commentid : id,
            threadlevel : 1,
            parentid: props.commentId
        }
        props.deleteComment(putdata);
    }

    return (
    <div>
    <div style={{color:'black',textDecoration:'underline'}} onClick={() => setReply(!reply)}>reply</div>
    {reply && <span><input onChange={(e) => setReply(e.target.value)} className="replybox" placeholder="reply..." />
    <span onClick={() => postReply()}className="commentbtn">reply</span></span>
    }
        {reply && props.reply&& props.reply.map(
        (item2) => 
        <div>
        {edit === item2._id? <input onChange={(e) => setReply(e.target.value)} style={{marginLeft: '40px',marginBottom: '14px'}} className="commentbox" placeholder="Say something..." /> :
        <div className="reply">{item2.text}</div>}
        {
                            localStorage.getItem('userid') === item2.commentorid? 
                            <span className="commentLabel"><div onClick={() => delComment(item2._id)} className="deletebtn">delete</div> <div onClick={edit === item2._id ? () => editComment(item2._id) : () => {setEdit(item2._id)}} className="deletebtn">{edit === item2._id ? 'save' : 'edit'}</div></span> 
                            : 
                            <div className="deletebtn">report</div>
        }
        </div>
        )}
     </div>
    );
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => {
    return {
        createComment: (payload) => dispatch(createComment(payload)),
        updateComment: (payload) => dispatch(updateComment(payload)),
        deleteComment: (payload) => dispatch(deleteComment(payload)),
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Replies);




