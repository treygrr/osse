import React from 'react';

import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';

import CreateForm from '../CreateForm';
import ViewEvent from '../CreateEvent/ViewEvent';
import EventList from '../CreateEvent/EventList';
import Header from './Header';

class App extends React.Component {
  constructor() {
    super();
    this.state = { 
      names: [],
      addMember: 'Typer Username',
      selection: null,
    };
  }

  appStateUpdate(data) {
    if (data){
      this.setState({
        names: data
      });
    }
  }
  updateSelection(selected){
    if (selected){
      this.setState({
        selection: selected
      });
    }
  }
  render(){
    return (
      <div className="App">
        <BrowserRouter>
        <Header />
        <EventList  data={ {updateSelection: this.updateSelection.bind(this)} } selectionName={this.state.selection}>
        </EventList>
          <div className="App-body">
            <Route path="/view" render={(props) => <ViewEvent selectionName={this.state.selection}  names={this.state.names}/>} />
            <Route path="/" exact render={(props) => <CreateForm data={{appStateUpdate:this.appStateUpdate.bind(this), updateSelection: this.updateSelection.bind(this), names: this.state.names, addMember: this.state.addMember}}/>}/>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;