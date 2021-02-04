import React,{useEffect,useState} from 'react';
import Replies from './reply';
import {createComment,updateComment,deleteComment} from '../actions/commentAction';
import { connect } from 'react-redux';


const Comments = (props) =>{

    const [comment,setComment] = useState(null);
    const [edit,setEdit] = useState(null);

    useEffect(() => {
        console.log(props.tweetId);
        console.log(props.Comments);
        console.log(props.Users);
    });

    const postComment = () => {

        let putdata = {
            data : JSON.stringify({
                text : comment,
            }),
            token : localStorage.getItem('twitter-token'),
            threadlevel : 0,
            _id : props.tweetId,
            parentid : props.tweetId,
        }
        props.createComment(putdata);
    }

    const editComment = (id) => {
        let putdata = {
            data : JSON.stringify({
                text : comment,
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
                text : comment,
            }),
            token : localStorage.getItem('twitter-token'),
            _id : props.tweetId,
            commentid : id,
            threadlevel : 0,
        }
        props.deleteComment(putdata);
    }

    return (
        <div>
           <input onChange={(e) => setComment(e.target.value)} className="commentbox" placeholder="Say something..." />
           <span onClick={() => postComment()}className="commentbtn">comment</span>
            <div>
                {
                    props.Comments && props.Comments['main'] && props.Comments['main'].map( 
                    (item) => 
                    <div>
                        {edit === item._id? <input onChange={(e) => setComment(e.target.value)} className="commentbox" placeholder="Say something..." /> :
                        <div className="comment">{item.text}</div>}
                        <div>
                        {
                            localStorage.getItem('userid') === item.commentorid? 
                            <span className="commentLabel"><div onClick={() => delComment(item._id)} className="deletebtn">delete</div> <div onClick={edit === item._id ? () => editComment(item._id) : () => {setEdit(item._id)}} className="deletebtn">{edit === item._id ? 'save' : 'edit'}</div></span> 
                            : 
                            <div className="deletebtn">report</div>
                        }
                        <Replies reply={null || props.Comments[item._id]} commentId={item._id} tweetId={props.tweetId}/>
                        </div>
                    </div>
                    )
                }
            </div>
        </div>
    );
}


const mapStateToProps = (state) => ({
    LoadingComments : state.commentReducer.isLoading,
})

const mapDispatchToProps = (dispatch) => {
    return {
        createComment: (payload) => dispatch(createComment(payload)),
        updateComment: (payload) => dispatch(updateComment(payload)),
        deleteComment: (payload) => dispatch(deleteComment(payload)),
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Comments);




