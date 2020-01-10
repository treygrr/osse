import React from 'react';
import '../CreateEvent/EventList.css';

export default class FilterData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterTerms: []
        };
        this.getFilterTerms();
        this.menuCode();
    }

    menuCode = (event) => {
        if(!event)return;
        this.props.updateFilter(event.target.value);
    }

    getFilterTerms() {
        if (this.props.list) {
            const skillObj = this.props.list[0][0].data[0][0].userData.expData.dataPoints;
            let filterTerms = [];
            for (let i = 0; Object.keys(skillObj).length > i; i++){
                filterTerms.push(Object.keys(skillObj)[i]);
            }
            let state = this.state;
            state.filterTerms = filterTerms;
            this.setState({
                state
            });
        }
    }    

    render() {
        
        return (
            <select onChange={this.menuCode}>
            <option value={""}>No Filter</option>
            {this.state.filterTerms.map((data, index)=>
                <option value={data} key={index}>{data}</option>
            )}
            </select>
        );
    }
}