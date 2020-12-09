import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles/index.css';
import 'bootstrap/dist/css/bootstrap.css'
import StreamEditor from './pages/StreamEditor';
import BranchCreator from './pages/BranchCreator';
import * as serviceWorker from './serviceWorker';
import {Navigation} from './components/navigation'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Navigation />
      <Switch>
        <Route exact path="/"> 
          <StreamEditor />  
        </Route>
        <Route exact path="/create-new-branch">
          <BranchCreator />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
