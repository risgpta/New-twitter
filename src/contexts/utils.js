import React, { createContext, useState, useEffect } from 'react';

export const UtilsContext = createContext();

const UtilsContextProvider = props => {
  
    const [chat,setChat] = useState(false);
    const [mytweet,setMytweet] = useState(false);
    

  return (
    <UtilsContext.Provider
      value={{
          chat,
          setChat,
          mytweet,
          setMytweet
      }}
    >
        {props.children}                                                                                                                                                                                                        
    </UtilsContext.Provider>
  )
}

export default UtilsContextProvider;