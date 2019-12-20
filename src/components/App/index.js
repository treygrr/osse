import React from 'react';

import './App.css';
import { BrowserRouter, Route, Link} from 'react-router-dom';

import CreateForm from '../CreateForm';
import CreateEvent from '../CreateEvent/CreateEvent';
import Header from './Header';
const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
        <div className="App-body">
          <Route path="/" exact component={CreateForm} />
          <Route path="/create" component={CreateEvent} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;