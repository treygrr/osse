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
            {this.state.storageData.map((data, index) =>
                <Link to="/view" replace>
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