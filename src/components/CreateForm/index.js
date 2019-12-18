import React from 'react';
import Axios from 'axios';

class CreateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            names: ['jonny','vurx', 'xulreh'],
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
        if (this.state.addMember === ''){
            alert('Input was empty!');
            return;
        }
        this.setState(state => {
            const names = [...state.names, state.addMember];
            return {
                names,
            };
        });
        this.setState({addMember: ''});
    }

    sendToServer() {
        const userlist = { data: this.state.names };
        const url = 'http://localhost:3001/skillevent/create';
        Axios.get(url, {
            params: {
              userlist
            }
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    render() {
      return (
        <section className="form-info-wrapper">
            <button onClick={this.sendToServer}>Take the shot!</button>
            <article>
            <p>added users</p>
            <ul>
                {this.state.names.map(name=> <li key={name}>{name}</li>)}
            </ul>
            </article>
            <form onSubmit={this.handleSubmit}>
            <label>
                username: 
            </label>
            <input type="text" value={this.state.addMember} defaultValue="username to add" onChange={this.handleUserNameChange}/>
            <input type="submit" value="Add" />
            </form>
            
        </section>
      );
    }
  }

  export default CreateForm;