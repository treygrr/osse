import React from 'react';
import logo from './logo.svg';
import './App.css';

import CreateForm from '../CreateForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <CreateForm></CreateForm>
      </header>
    </div>
  );
}

export default App;