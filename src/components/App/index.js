import React from 'react';

import './App.css';
import { BrowserRouter, Route, Link} from 'react-router-dom';

import CreateForm from '../CreateForm';
import CreateEvent from '../CreateEvent/CreateEvent';
import Header from './Header';

class App extends React.Component {
  constructor() {
    super();
    this.state = { 
      names: [],
      addMember: 'tea'
    };
  }

  appStateUpdate(data) {
    this.setState({
      names: data
    });
  }

  render(){
    return (
      <div className="App">
        <BrowserRouter>
        <Header />
          <div className="App-body">
            <Route path="/" exact render={(props) => <CreateForm data={this.appStateUpdate.bind(this)}/>}/>
            <Route path="/create" component={CreateEvent} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;