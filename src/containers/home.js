import React from 'react';
import SnackbarProvider from 'react-simple-snackbar';

import Header from './header';
import MainArea from '../components/mainArea';
import AllTweetList from './alltweetsList';
import Sidebar from './sidebar';
import RightSidebar from '../components/rightSidebar';
import UtilsContextProvider from '../contexts/utils';
import SnackbarContextProvider from '../contexts/snackbar';

import '../App.css'; 
import MainLayout from './mainLayout';

function Home(){
    return (
        <div>
            <SnackbarProvider>
            <SnackbarContextProvider>
            <UtilsContextProvider>
            <Header/>
            <SnackbarProvider>
            <div className="dashboard">
            <Sidebar/>
            <MainLayout/>
            <RightSidebar/>
            </div>
            </SnackbarProvider>
            </UtilsContextProvider>
            </SnackbarContextProvider>
            </SnackbarProvider>
        </div>
    );
}

export default Home;