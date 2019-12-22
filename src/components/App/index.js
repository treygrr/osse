import React from 'react';

import './App.css';
import { BrowserRouter, Route, Link} from 'react-router-dom';

import CreateForm from '../CreateForm';
import CreateEvent from '../CreateEvent/CreateEvent';
import EventList from '../CreateEvent/EventList';
import Header from './Header';

class App extends React.Component {
  constructor() {
    super();
    this.state = { 
      names: [],
      addMember: 'Typer Username'
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
        <EventList></EventList>
          <div className="App-body">
            
            <Route path="/create" component={CreateEvent} />
            <Route path="/" exact render={(props) => <CreateForm data={{appStateUpdate:this.appStateUpdate.bind(this), names: this.state.names, addMember: this.state.addMember}}/>}/>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;