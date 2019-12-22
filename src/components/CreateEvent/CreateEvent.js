import React from 'react';
import Axios from 'axios';
import { BrowserRouter, Route, Link} from 'react-router-dom';

class CreateForm extends React.Component {
    constructor(props) {
      super(props)
    }
  
    list() {
      console.log(this.props.names);
    }
  
    render() {
      return (
        <section className="create-info-wrapper">
            <Link to="/">Go Home</Link>
        </section>
      );
    }
  }

  export default CreateForm;