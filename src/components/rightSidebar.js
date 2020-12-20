import React,{useState,useEffect,useRef} from 'react';
import { connect } from 'react-redux'
import '../App.css';
import app from '../firebase';

const RightSidebar = (props) => {
    const [chat,setChat] = useState(false);

    const [imessage,setImessage] = useState([]);
    const [wc,setWC] = useState([]);
    const [omessage,setOmessage] = useState('');

    const [username,setUsername] = useState(null);

    const [chatid,setChatId] = useState(null);

    const bottomRef = useRef(null);

    useEffect(() => {

        console.log(chatid);
        if(chatid)
        {
        const ref = chatid;
        const fire = app.database().ref(ref);
        console.log('listening...')
        let  item = [];
        fire.on("child_added",function(snapshot){
            //console.log(wc);
            const m =snapshot;
            console.log(m.key+' '+m.val().message);
            item.push(<div key={m.val().timestamp}><span style={{color:'white'}}>{m.val().author}:  </span>{m.val().message}</div>)
            let tem = [];
            if(!wc.includes(m.key))
            {
                tem.push(...wc,m.key);
                setWC(tem);
                console.log(tem);
                item.sort(function(a,b){
                    return a.key - b.key;
                })
                console.log(item);
                setImessage(item);
                //bottomRef.current.scrollIntoView({ block:'start' })
                //<div ref={bottomRef} style={{height:'20px'}}></div>
            }
        });
            return () => fire.off("child_added");
    }
    },[imessage,chatid]);
 
    const change = (msg) => {
        setOmessage(msg);
    }

    const userchange = (msg) => {
        setUsername(msg);
    }

    const send = () => {
        let chatbox = app.database().ref(chatid);
        let time = new Date().getTime();
        console.log(omessage);
        chatbox.push().set({
            authorId : localStorage.getItem('userid'),
            author : localStorage.getItem('username'),
            message : omessage,
            timestamp : time
        })
        setOmessage('');
    }

    const set = () => {
        const my_id = localStorage.getItem('userid');
        const another_id = props.user[username];
        if(!props.user[username])
        {
            alert('invalid username');
            return false;
        }
        const mix_id = my_id < another_id ? my_id+another_id : another_id+my_id;
        console.log(my_id);
        console.log(another_id);
        console.log(mix_id);
        setChatId(mix_id);
        setChat(true);
    }

    return(
        localStorage.getItem('twitter-token') && <div style={{textAlign:'center'}} className="rightSidebar">
            {
            !chat && <div>
           <div>Chat Box</div>
            <input className="usernameChat"onChange={(e) => userchange(e.target.value)} placeholder="username"/>
                {username && <div className="searchTweet" onClick={()=>set()}>Open Chat for {username}</div>}
            </div>
            }
            {chat && 
            <div>
                <div>Chat box</div>
                <div className="chatspace">
                {imessage}
                </div>
                <input className="msg" placeholder="message" value={omessage} onChange={(e) => change(e.target.value)}/>
                <div className="smallbtn" onClick={() => send()}>send</div>
            </div>
            }
        </div>
    );
}

const mapStateToProps = (state) => ({
    user : state.miscActionReducer.usernameData,
})

const mapDispatchToProps = (dispatch) => {
    return {

    };
};

export default connect(mapStateToProps,mapDispatchToProps)(RightSidebar);

