import React, { createContext, useState, useEffect } from 'react';
import { useSnackbar } from 'react-simple-snackbar';

export const SnackbarContext = createContext();

const SnackbarContextProvider = props => {
  
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
    

  return (
    <SnackbarContext.Provider
      value={{
          options,
          optionsError,
          openSnackbar,
          openErrSnackbar,
          closeSnackbar,
          closeErrSnackbar,
      }}
    >
        {props.children}                                                                                                                                                                                                        
    </SnackbarContext.Provider>
  )
}

export default SnackbarContextProvider;
