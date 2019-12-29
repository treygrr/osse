import React from 'react';

import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import CookieConsent from 'react-cookie-consent'


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

  componentDidMount(){
    this.hotjar();
  }

  appStateUpdate(data) {
    if (data){
      this.setState({
        names: data
      });
    }
  }

  hotjar() {
    ((h,o,t,j,a,r)=>{
      h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
      h._hjSettings={hjid:1626185,hjsv:6};
      a=o.getElementsByTagName('head')[0];
      r=o.createElement('script');r.async=1;
      r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
      a.appendChild(r);
  })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
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
        <CookieConsent>
          This website uses cookies to enhance the user experience.
        </CookieConsent>
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