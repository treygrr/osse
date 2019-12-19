import React from 'react';
import Axios from 'axios';

class CreateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            names: [],
            addMember: ''
        };

        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.sendToServer = this.sendToServer.bind(this);
    }
  
    handleUserNameChange(event) {
        this.setState({addMember: event.target.value});
    }

    handleSubmit(event) {
    event.preventDefault();
        if (this.state.addMember === '') return;
    
        const userinfo = {
          userData: {
            name: this.state.addMember,
            loading: false,
            loaded: false,
            failed: false
          }
        }

        let joined = this.state.names.concat(userinfo)
        this.setState({
          names: joined
        });
        this.setState({addMember: ''});
    }

    sendToServer() {
        const userlist = this.state.names;
        const url = 'http://localhost:3001/skillevent/create';
        for (let i = 0; userlist.length > i; i++){
          console.log(i);


          let getLoading = this.state.names;
          getLoading[i].userData.loading = true;
          getLoading[i].userData.loaded = false;
          getLoading[i].userData.failed = false;
          this.setState({
            names: getLoading
          });

          console.log(getLoading);
          Axios.get(url, {
            params: {
              username: userlist[i].userData.name
            }
          })
          .then((response) => {
            if (response.status === 200){
              getLoading[i].userData.loading = false;
              getLoading[i].userData.loaded = true;
              getLoading[i].userData.failed = false;
              this.setState({
                names: getLoading
              });
              console.log(response);
            }
          })
          .catch((error) => {
            if (error.status !== 200){
              getLoading[i].userData.failed = true;
              getLoading[i].userData.loading = false;
              getLoading[i].userData.loaded = false;
              this.setState({
                names: getLoading
              });
              return;
            }
            console.log(error);
          });
        }
        
    }

    showNamesList() {
      const listItem = this.state.names;
      if (!Array.isArray(listItem) || !listItem.length) return;
      return (
        <ul>
          {listItem.map((data, index) => 
          <li className="list-item-names"key={index}>{this.state.names[index].userData.name}
            {this.state.names[index].userData.loading ? <div className="loadingio-spinner-rolling-zlhkp6cwop"><div className="ldio-6zt3tgvfpyv"><div></div></div></div>: null}
            {this.state.names[index].userData.loaded ? <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
  <circle class="path circle" fill="none" stroke="#73AF55" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
  <polyline class="path check" fill="none" stroke="#73AF55" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 "/>
</svg> : null}
            {this.state.names[index].userData.failed ? <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
  <circle class="path circle" fill="none" stroke="#D06079" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
  <line class="path line" fill="none" stroke="#D06079" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="34.4" y1="37.9" x2="95.8" y2="92.3"/>
  <line class="path line" fill="none" stroke="#D06079" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="95.8" y1="38" x2="34.4" y2="92.2"/>
</svg> : null}
          </li>)
          }
        </ul>
      );
      
    }
    render() {
      return (
        <section className="form-info-wrapper">
            <button onClick={this.sendToServer}>Fetch Data</button>
            <article>
            <p>added users</p>
            {this.showNamesList()}
            </article>
            <form onSubmit={this.handleSubmit}>
            <label>
                username: 
            </label>
            <input type="text" value={this.state.addMember} onChange={this.handleUserNameChange}/>
            <input type="submit" value="Add" />
            </form>
            
        </section>
      );
    }
  }

  export default CreateForm;