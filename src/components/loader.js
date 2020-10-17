import React,{useContext,useState,useEffect} from 'react';
import {UtilsContext} from '../contexts/utils';

const Loader = () =>{

    const {loader,loader2} = useContext(UtilsContext);

    useEffect(() => {
        if(loader || loader2)
        {
            document.getElementById('loader').style.display = 'block';
        }
        else
        {
            document.getElementById('loader').style.display = 'none';
        }

    }, [loader,loader2])
    return (
        <div id="loader"></div>
    );
}

export default Loader;