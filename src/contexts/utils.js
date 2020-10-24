import React, { createContext, useState, useEffect } from 'react';

export const UtilsContext = createContext();

const UtilsContextProvider = props => {
  
    const [chat,setChat] = useState(false);
    const [mytweet,setMytweet] = useState(false);
    const [editTweet,setEditTweet] = useState(null);
    const [editTweetContent,setEditTweetContent] = useState(null);
    const [editTweetLikes,setEditTweetLikes] = useState(null);
    const [loader,setLoader] = useState(false);
    const [loader2,setLoader2] = useState(false);

  return (
    <UtilsContext.Provider
      value={{
          chat,
          setChat,
          mytweet,
          setMytweet,
          editTweet,
          setEditTweet,
          editTweetContent,
          setEditTweetContent,
          editTweetLikes,
          setEditTweetLikes,
          loader,
          setLoader,
          loader2,
          setLoader2
      }}
    >
        {props.children}                                                                                                                                                                                                        
    </UtilsContext.Provider>
  )
}

export default UtilsContextProvider;