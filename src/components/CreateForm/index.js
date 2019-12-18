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
            loaded: false
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
              this.setState({
                names: getLoading
              });
              console.log(response);
            }
          })
          .catch(function (error) {
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
            {this.state.names[index].userData.loaded ? <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/><path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg>: null}
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