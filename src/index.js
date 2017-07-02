import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

import './css/style.css';
import StorePicker from './components/StorePicker';
import App from './components/App';
import {NotFound}  from './components/NotFound';

const Root = () => {
  return(
    <Router>
      <Switch>
        <Route exact path="/" component={StorePicker}></Route>
        <Route path="/store/:storeId" component={App}></Route>
        <Route component={NotFound}></Route>
      </Switch>
    </Router>
  );
};

render( <Root/> , document.getElementById('main'));

registerServiceWorker();
