import React from 'react';
import logo from '../App/logo.svg';
import lantern from '../App/lantern.svg'
import github from '../App/github.svg'

class Header extends React.Component {

    render() {
        return (
            <div className="App-header">
                <div className="logo-wrapper">
                    <img src={logo} className="App-logo App-header-item" alt="logo" />
                    <img src={lantern} className="App-logo-lantern" alt="lantern" />
                </div>
                
                <p>OSRS:SE</p>
                <a href="https://github.com/treygrr/osse"><img src={github} className="App-logo-github" alt="github" /></a>
            </div>
        );
    }

}

export default Header;