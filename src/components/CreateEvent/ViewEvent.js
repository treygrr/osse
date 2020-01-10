import React from 'react';
import { Link } from 'react-router-dom';
import './ViewEvent.css';
import img from './clicktosee.png'
import getCurrent from '../CreateEvent/GetCurrent';
import FilterData from '../CreateEvent/FilterData';

class View extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
          list: this.getData(),
          current: [],
          selection: this.props.selectionName,
          filter: ''
      }

    }

    componentDidMount() {
        this.setCurrent().then(async ()=>{

            let data = await this.updateCurrentDataSet(this.state.selection);
            await this.setState({
                current: data
            });

        });
    }

    async componentWillReceiveProps(newProps) {
        const oldProps = this.props
        if(oldProps.selection !== newProps.selectionName){
            await this.setState({selection: newProps.selectionName});
            this.updateCurrentDataSet(this.state.selection);
        }
    }

    componentDidUpdate() {
        
    }


    getData(){
        let imported = JSON.parse(localStorage.getItem('listicles'));
        let arrayNew = [];
        arrayNew.push(imported);
        for (let a = 0; arrayNew[0].length > a; a++) {
            for (let b = 0; arrayNew[0][a].data[0].length > b; b++) {
                if (arrayNew[0][a].data[0][b] === null) {
                    arrayNew[0][a].data[0].splice(b, 1);
                }
            }
        }
        return arrayNew;
    }

    async updateCurrentDataSet (selection) {
        let newest = this.state.current;
        let currents = newest;
        if (currents[0].length && currents[0] !== undefined){
            for (let a = 0; currents[0].length > a; a++) {
                if (currents[0][a].eventName === selection){
                    let data = currents[0][a].data[0];
                    for (let b = 0; data.length > b; b++){
                        if (data[b]!== null && data[b].userData.requested === false && data[b].userData.failed === false) {
                            let api = new getCurrent();
                            data[b].userData.requested = true;
                            api.getUserData(data[b].userData.name).then(async(res)=> {
                                if (res.status === 200) {
                                    data[b].userData.failed = false;
                                    data[b].userData.loaded = true;
                                    data[b].userData.expData.dataPoints = res.data.dataPoints;
                                    this.setState({
                                        current: currents
                                    });
                                }else {
                                    data[b].failed = true;
                                    data[b].loaded = false;
                                    this.setState({
                                        current: currents
                                    });
                                }
                            });
                        }
                    }
                }
            }
        }
        return currents;
    }

    async setCurrent() {
        let old = JSON.stringify(this.state.list);
        let newest = JSON.parse(old);

        let currents = newest;
        if (currents[0].length){
            for (let a = 0; currents[0].length > a; a++) {
                let data = currents[0][a].data[0];
                for (let b = 0; data.length > b; b++){
                    if (data[b] !== null && data[b].userData.loaded === true) {
                        data[b].userData.loaded = false;
                        data[b].userData.expData.dataPoints = {};
                        data[b].userData.requested = false;
                    }
                }
            }
        }
        await this.setState({
            current: currents
        });
    }   

    showCard() {
        if (this.props.selectionName === null) {
            return (
                <div className="showOptions">
                    <div><img src={img} width="400px" alt="click to display data"></img></div>
                    <Link to="/">create a new event</Link>
                </div>
            )
        }else {
            return (
                <div className="cardsWrapper">
                    {this.renderAllStatsCard(this.props.selectionName)}
                    
                </div>
            );
        }
    }

    renderAllStatsCard(selection) {
        let lister = this.state.list[0];
        if (lister.length){
            for (let i = 0; lister.length > i; i++) {
                if (selection === lister[i].eventName){
                    let eventName = lister[i].eventName
                    let datas = lister[i].data;
                    let userDataOld = datas[0];

                    let userDataNew = [];

                    for (let b = 0; userDataOld.length > b; b++){
                        if (userDataOld[b] !== null) {
                            userDataNew.push(userDataOld[b]);
                        }
                    }

                    return(
                        userDataNew.map((data, index) => 
                            <div key={index} className="cardOuterWrapper">
                                <div className="cardTitle">username: {data.userData.name}</div>
                                <div className="cardInnerWrapper">
                                    {this.renderStartingStats(eventName, userDataNew, i, index)}
                                    {this.renderCurrentStats(eventName, userDataNew, i, index)}
                                    {this.renderDifference(eventName, userDataNew, i, index)}
                                </div>
                            </div>
                        )

                    )
                }
            }
        }
    }

    renderStartingStats(eventName, data, ai, bi) {
        if (!this.state.current[0])return;
        let missile = this.state.list[0][ai].data[0][bi].userData.expData.dataPoints
        return (
        <div className="startColumn">
            <div className="startColumnTitle">
                starting stats
            </div>
            <div className="startColumnSkill">
                <div className="startColumnTitle">skill</div>
            </div>
            <div className="startColumnRank">
                <div className="startColumnTitle">rank</div>
            </div>
            <div className="startColumnLevel">
                <div className="startColumnTitle">level</div>
            </div>
            <div className="startColumnExperience">
                <div className="startColumnTitle">exp</div>
            </div>
            <div className="startingSkillList">
                {Object.keys(missile).map((data, index)=>
                    <div key={data} className="skillWrapper">
                        <div className="skillHolder">{data}</div>
                        <div className="skillHolder">{missile[data].rank}</div>
                        <div className="skillHolder">{missile[data].level}</div>
                        <div className="skillHolder">{missile[data].xp}</div>
                    </div>
                )}
            </div>
        </div>
        );
        
    }



    renderCurrentStats(eventName, data, ai, bi){
        if (!this.state.current[0])return;
        let missile = this.state.current[0][ai].data[0][bi].userData.expData.dataPoints
        let loaded = this.state.current[0][ai].data[0][bi].userData.loaded;


        return (
            <div className="currentColumn">
                {loaded?null:
                    <div className="loadingWrapper">
                    <div>
                        fletchin stats
                    </div>
                    <div className="loadingio-spinner-rolling-zlhkp6cwop">
                        <div className="ldio-6zt3tgvfpyv">
                            <div>
                            </div>
                        </div>
                    </div>
                    </div>
                }
            {loaded? <><div className="currentColumnTitle">
                current stats
            </div>
            <div className="currentColumnSkill">
                <div className="currentColumnTitle">skill</div>
            </div>
            <div className="currentColumnRank">
                <div className="currentColumnTitle">rank</div>
            </div>
            <div className="currentColumnLevel">
                <div className="currentColumnTitle">level</div>
            </div>
            <div className="currentColumnExperience">
                <div className="currentColumnTitle">exp</div>
            </div>
            <div className="currentSkillList">
                {Object.keys(missile).map((data, index)=>
                    <div key={data} className="skillWrapper">
                        <div className="skillHolder">{data}</div>
                        <div className="skillHolder">{missile[data].rank}</div>
                        <div className="skillHolder">{missile[data].level}</div>
                        <div className="skillHolder">{missile[data].xp}</div>
                    </div>
                )}
            </div>
    </>: null}
        </div>
        );
    }

    getDifferenceData(){
        console.log('gettting difference data')
    }

    renderDifference(eventName, data, ai, bi) {       
        if (!this.state.current[0])return;
        let curr = this.state.current[0][ai].data[0][bi].userData.expData.dataPoints
        let old = this.state.list[0][ai].data[0][bi].userData.expData.dataPoints
        let loaded = this.state.current[0][ai].data[0][bi].userData.loaded;
        if (loaded){
            this.getDifferenceData(ai, bi);
        }
        return (
            <div className="diffColumn">
                {loaded?null:
                    <div className="loadingWrapper">
                    <div>
                        waiting on stats
                    </div>
                    <div className="loadingio-spinner-rolling-zlhkp6cwop">
                        <div className="ldio-6zt3tgvfpyv">
                            <div>
                            </div>
                        </div>
                    </div>
                    </div>
                }
            {loaded? <><div className="currentColumnTitle">
                 stats diff
            </div>
            <div className="currentColumnSkill">
                <div className="currentColumnTitle">skill</div>
            </div>
            <div className="currentColumnRank">
                <div className="currentColumnTitle">rank</div>
            </div>
            <div className="currentColumnLevel">
                <div className="currentColumnTitle">level</div>
            </div>
            <div className="currentColumnExperience">
                <div className="currentColumnTitle">exp</div>
            </div>
            <div className="currentSkillList">
           {Object.keys(curr).map((data, index)=>
                    <div key={data} className="skillWrapper">
                        <div className="skillHolder">{data}</div>
                        <div className="skillHolder">{curr[data].rank - old[data].rank}</div>
                        <div className="skillHolder">{curr[data].level - old[data].level}</div>
                        <div className="skillHolder">{curr[data].xp - old[data].xp}</div>
                    </div>
            )}
            </div>
            </>: null}
        </div>
        );
    }

    render() {
      return (
        <section className="viewEventWrapper">
            {this.showCard()}
        </section>
      );
    }
  }

  export default View;