import React from 'react';
import { BrowserRouter as Router,Switch, Route } from "react-router-dom";
import { CookiesProvider } from 'react-cookie';
import Home from './home';
import Newtwitter from './newtwitter';

function App() {

  return (
    <div>
      <CookiesProvider>
      <Router>
        <Switch>
          <Route path="/" exact component={Newtwitter}/>
          <Route path="/home" exact component={Home}/>
        </Switch>
      </Router>
      </CookiesProvider>
    </div>
  );
}

export default App;