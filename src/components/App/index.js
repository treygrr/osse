import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Link} from 'react-router-dom';

import CreateForm from '../CreateForm';
import CreateEvent from '../CreateEvent';

const App = () => {
  return (
    <div className="App">
        <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          <BrowserRouter>
            <div>
              <Route path="/" exact component={CreateForm} />
              <Route path="/create" component={CreateEvent} />
            </div>
          </BrowserRouter>
        </div>
    </div>
  );
}

export default App;