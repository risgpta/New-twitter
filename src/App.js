import React from 'react';
import { HashRouter as Router,Switch, Route } from "react-router-dom";
import { CookiesProvider } from 'react-cookie';
import {Provider} from 'react-redux';
import store from './store';
import Home from './containers/home';
import Newtwitter from './newtwitter';

function App() {

  return (
    <div>
      <Provider store={store}>
      <CookiesProvider>
      <Router>
        <Switch>
          <Route path="/entry" exact component={Newtwitter}/>
          <Route path="/" exact component={Home}/>
        </Switch>
      </Router>
      </CookiesProvider>
      </Provider>
    </div>
  );
}

export default App;