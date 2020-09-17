import React,{useState,useEffect} from 'react';
import { useCookies } from 'react-cookie';
import { useSnackbar } from 'react-simple-snackbar';
import { Redirect } from 'react-router';

import '../App.css';

import TweetList from './tweetList';
import Tweet from './tweet';

const MainArea = () => {
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
    const [cookies, setCookie] = useCookies();
    const [tweet,setTweet] = useState(null);

    const postTweet = (e) =>{
        e.preventDefault();
        let data = {};
        data['content'] = document.getElementById('tweetContent').value;
        setTweet(data);
        console.log(data);
    }

    const request = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json','Authorization':'Token '+cookies.Token},
        body: JSON.stringify(tweet)
      };
    
      useEffect(() => {
        if(tweet!=null)
        {
          fetch('https://twitter-clone-mukul.herokuapp.com/mytweet/',request)
          .then(response => {
            console.log(response);
            const responseJson = response.json().then(data => {
            console.log(data); 
            if(response.status === 201)
            {
                openSnackbar('POSTED!');
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
        }
      },[tweet])


    if(!cookies.Token)
    return <Redirect to='/'/>
    return(
        <div className="mainArea">
            <form>
            <textarea id="tweetContent" name="content" rows="5"  placeholder="What's happening?" className="textArea"></textarea>
            <input className="smallbtn" onClick={e => postTweet(e)} type="submit" value="Tweet"/>
            </form>
            <TweetList/>
        </div>
    );
}

export default MainArea;
