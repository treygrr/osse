import React from 'react';
import { Link } from 'react-router-dom';
import '../CreateEvent/EventList.css';

class EventList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            storageData: [],
            selection: this.props.selectionName,
            refreshed: false
        } 
        this.getDataStart();
    }

    setSelection(sel){
        this.setState({
            selection: sel
        })
        this.props.data.updateSelection(sel)
    }

    async getDataStart() {
        let newData = await JSON.parse(localStorage.getItem('listicles'));
        this.setState({
            storageData: newData
        });
    }

    async getData() {
        let newData = await JSON.parse(localStorage.getItem('listicles'));
        let oldData = this.state.storageData;
        if (JSON.stringify(newData) === JSON.stringify(oldData)) {
        } else {
            this.setState({
                storageData: newData,
                selection: this.props.selectionName
            });
        }

    }

    renderButtons(){
        this.getData();
        if (this.state.storageData === null)return;
        return(
            <ul>
            <link href="https://fonts.googleapis.com/css?family=Cookie" rel="stylesheet"/>
            <a className="bmc-button" target="_blank" href="https://www.buymeacoffee.com/ylWKM4A">
              <img src={'https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg'} alt={'Say thanks with a coffee'}/>
                <span style={{marginLeft:'15px'},{fontSize:'28px !important'}}>
                  Say thanks with a coffee
                </span>
            </a>
            {this.state.storageData.map((data, index) =>
                <Link key={index} to="/view" replace>
                    <li key={index} className={data.eventName === this.state.selection? 'selected': ''}
                        onClick={()=>
                            this.setSelection(data.eventName)
                        }
                    >
                    {data.eventName}
                    </li>
                </Link>
            )}
        </ul>
        );
    }

    showCreatedEvents() {        
        return (
            <div className="card createdWrapper">
                {this.renderButtons()}
            </div>
        )
    }

    render() {
        return (
            <div>
              {this.showCreatedEvents()}
            </div>
        );
    }

}

export default EventList;