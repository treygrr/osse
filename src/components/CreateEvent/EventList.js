import React from 'react';
import '../CreateEvent/EventList.css';
class EventList extends React.Component {
    constructor(){
        super();
        this.state = {
            storageData: [],
        } 
    }

    async getData() {
        let oldData = this.state.storageData;
        let newData = JSON.parse(localStorage.getItem('listicles'));
        await this.setState({
            storageData: newData
        })
    }

    componentDidMount() {
        this.getData();        
    }

    showCreatedEvents() {
        if (this.state.storageData === undefined || this.state.storageData === null) return;
        console.log(this.state.storageData);

        return (
            <div className="card createdWrapper">
                <ul>
                
                </ul>
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