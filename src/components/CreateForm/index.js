import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

class CreateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            names: [],
            addMember: '',
            expData: {},
            waitingForAPI: true,
            newTitle: null,
        };
        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.sendToServer = this.sendToServer.bind(this);
    }
  
    handleUserNameChange(event) {
        this.setState({addMember: event.target.value});
    }

    async handleSubmit(event) {
    event.preventDefault();
        if (this.state.addMember === '') return;
    
        const userinfo = {
          userData: {
            name: this.state.addMember,
            loading: false,
            loaded: false,
            failed: false,
            expData: {}
          }
        }
        let joined = this.state.names.concat(userinfo)
        await this.setState({
          names: joined
        });
        this.sendToServer(this.state.addMember);
        this.setState({addMember: ''});
    }

    async sendToServer(memberName) {
        const userlist = this.state.names;
        const url = 'http://localhost:3001/skillevent/create';
        for (let i = 0; userlist.length > i; i++){
          let getLoading = this.state.names;
          let check = getLoading[i];
          if (typeof check === "undefined") continue;
          if (getLoading[i].userData.loaded === true || getLoading[i].userData.loading === true || getLoading[i].userData.failed === true) {
            continue;
          }
          getLoading[i].userData.loading = true;
          getLoading[i].userData.loaded = false;
          getLoading[i].userData.failed = false;
          await this.setState({
            names: getLoading,
            waitingForAPI: true
          });
          await Axios.get(url, {
            params: {
              username: userlist[i].userData.name
            }
          })
          .then(async(response) => {
            if (response.status === 200){
              getLoading = this.state.names;
              getLoading[i].userData.loading = false;
              getLoading[i].userData.loaded = true;
              getLoading[i].userData.failed = false;
              getLoading[i].userData.expData = response.data;
              await this.setState({
                names: getLoading,
                waitingForAPI: false
              });
              // console.log(getLoading[i].userData.expData);
            }
          })
          .catch(async(error) => {
            if (error.status !== 200){
              getLoading = this.state.names;
              if (getLoading[i] === undefined) return
              getLoading[i].userData.failed = true;
              getLoading[i].userData.loading = false;
              getLoading[i].userData.loaded = false;
              await this.setState({
                names: getLoading,
                waitingForAPI: false
              });
              return;
            }
            console.log(error);
          });
        }
        
    }

    removeName(indexVal) {
      let newList = this.state.names;
      delete newList[indexVal];

      this.setState({
        names: newList
      });

    }

    async setStoredData() {
      let oldData = JSON.parse(localStorage.getItem('listicles'));
      let response = prompt("name the event");
      if (!response)return;
      this.props.data.updateSelection(response)
      console.log(oldData);
      if (oldData);
      if (Array.isArray(oldData)){
        console.log('found array')
        console.log(oldData);
        let eventContainer = {
          data: [this.state.names],
          eventName: response
        }
        oldData.push(eventContainer);
        localStorage.setItem('listicles', JSON.stringify(oldData));
        return;
      }
      let eventContainer = {
        data: [this.state.names], 
        eventName: response
      }
      let arrayHolder = [];
      arrayHolder.push(eventContainer);
      console.log('did not find array');
      localStorage.setItem('listicles', JSON.stringify(arrayHolder));
     
    }

    showNamesList() {
      const listItem = this.state.names;
      if (!Array.isArray(listItem) || !listItem.length) return;
      return (
        <ul className="listview">
          {listItem.map((data, index) => 
          <li className="list-item-names"key={index}>{this.state.names[index].userData.name}
            {this.state.names[index].userData.loading ? <div className="loadingio-spinner-rolling-zlhkp6cwop"><div className="ldio-6zt3tgvfpyv"><div></div></div></div>: null}
            {this.state.names[index].userData.loaded ? <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
  <circle className="path circle" fill="none" stroke="#73AF55" strokeWidth="6" strokeMiterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
  <polyline className="path check" fill="none" stroke="#73AF55" strokeWidth="6" strokeLinecap="round" strokeMiterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 "/>
</svg> : null}
            {this.state.names[index].userData.failed ? <div onClick={()=>this.removeName(index)}><svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
  <circle className="path circle" fill="none" stroke="#D06079" strokeWidth="6" strokeMiterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
  <line className="path line" fill="none" stroke="#D06079" strokeWidth="6" strokeLinecap="round" strokeMiterlimit="10" x1="34.4" y1="37.9" x2="95.8" y2="92.3"/>
  <line className="path line" fill="none" stroke="#D06079" strokeWidth="6" strokeLinecap="round" strokeMiterlimit="10" x1="95.8" y1="38" x2="34.4" y2="92.2"/>
</svg></div> : null}
          </li>)
          }
        </ul>
      );  
    }

    checkForAllLoaded() {
      const listItem = this.state.names;
      let trigger = true;

      if (!Array.isArray(listItem) || !listItem.length) return;
   
      listItem.map((data) => {
        data.userData.loaded? trigger = true: trigger = false;
        data.userData.loading? trigger = false: trigger = true;
      });

      return trigger;
    }

    checkForFailed() {
      const listItem = this.state.names;
      let foundFailure = false;
      if (!Array.isArray(listItem) || !listItem.length) return;
      
      for (let i = 0; listItem.length > i; i++){
        let item = listItem[i];
        if (item === undefined || item === null) continue;
        if (listItem[i].userData.failed === true){
          return true;
        }
      }
      return foundFailure;      
    }

    canCreate() {
      if (this.state.names.length && this.checkForAllLoaded() && !this.checkForFailed()) {
        return true;
      }
      return false;
    }

    render() {
      return (
        <section className="form-info-wrapper">
            <article>
            <p>start typing to grab user data</p>
            <form className="form-add-user" onSubmit={this.handleSubmit}>
            <label className="username-label">
                username: 
            </label>
            <input className="form-textfield" type="text" value={this.state.addMember} onChange={this.handleUserNameChange}/>
            <input className="form-button" type="submit" value="add" />
            </form>
            {this.showNamesList()}
            <div className="ButtonsWrapper">
              {this.canCreate() ? <Link onClick={
                ()=>{
                  this.props.data.appStateUpdate(this.state.names)
                  this.setStoredData()
                }
                } className="a-button" to="/view">create clan event</Link>: null }
                
                
            </div>
            {this.state.names.length? 
            <section>
              <p>{this.checkForAllLoaded()? '':'fletchin data'}</p>
              <p className="status-message">
                {this.checkForFailed()? 'failed username check(s). try rechecking if you think this is in error; otherwise remove failed usernames.' : null }
              </p>
              </section>
             : null }
            </article>
            
        </section>
      );
    }
  }

  export default CreateForm;