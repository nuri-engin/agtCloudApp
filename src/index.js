import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import User from './components/user/User';
import EditU from './components/user/EditU';
import CreateU from './components/user/CreateU';
import ShowU from './components/user/ShowU'; 

import Farm from './components/farm/Farm';
import EditF from './components/farm/EditF';
import CreateF from './components/farm/CreateF';
import ShowF from './components/farm/ShowF'; 

/**
 * import Farm from './components/farm/Farm'; 
 */
ReactDOM.render(
  <Router>
      <div>
        {/** MAIN SCREEN */}
        <Route exact path='/' component={App} />
        
        {/** USERS SCREENS */}
        <Route exact path='/user' component={User} />
        <Route path='/edituser/:id' component={EditU} />  
        <Route path='/createuser' component={CreateU} />
        <Route path='/showuser/:id' component={ShowU} />

        {/** FARMS SCREENS */}
        <Route exact path='/farm' component={Farm} /> 
        <Route path='/editfarm/:id' component={EditF} />  
        <Route path='/createfarm' component={CreateF} />
        <Route path='/showfarm/:id' component={ShowF} />
        
      </div>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
