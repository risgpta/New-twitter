import React from 'react';
import SnackbarProvider from 'react-simple-snackbar';

import Header from './components/header';
import MainArea from './components/mainArea';
import Sidebar from './components/sidebar';
import RightSidebar from './components/rightSidebar';
import './App.css'; 

function Home(){
    return (
        <div>
            <Header/>
            <SnackbarProvider>
            <div className="dashboard">
            <Sidebar/>
            <MainArea/>
            <RightSidebar/>
            </div>
            </SnackbarProvider>
        </div>
    );
}

export default Home;