import React from 'react';
import { Link } from 'react-router-dom';
import './ViewEvent.css';
import img from './clicktosee.png'
import getCurrent from '../CreateEvent/GetCurrent';

class View extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
          list: this.getData(),
          current: [],
          selection: this.props.selectionName
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
        let data = JSON.parse(localStorage.getItem('listicles'));
        let arrayNew = [];
        arrayNew.push(data);
        return arrayNew;
    }

    async updateCurrentDataSet (selection) {
        let newest = this.state.current;
        let currents = newest;
        if (currents[0].length){
            for (let a = 0; currents[0].length > a; a++) {
                if (currents[0][a].eventName === selection){
                    let data = currents[0][a].data[0];
                    for (let b = 0; data.length > b; b++){
                        if (data[b].userData.requested === false && data[b].userData.failed === false) {
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
                    if (data[b].userData.loaded === true) {
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
                    return(
                        userDataOld.map((data, index) => 
                            <div key={index} className="cardOuterWrapper">
                                {this.updateCurrentDataSet(eventName, userDataOld, i, index)}
                                <div className="cardTitle">username: {data.userData.name}</div>
                                <div className="cardInnerWrapper">
                                    {this.renderStartingStats(eventName, userDataOld, i, index)}
                                    {this.renderCurrentStats(eventName, userDataOld, i, index)}
                                    {this.renderDifference(eventName, userDataOld, i, index)}
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

    updateCurrentDataSet(eventName, data, ai, bi) {
        if (!this.state.current[0])return;
        let missile = this.state.current[0][ai].data[0][bi].userData.expData.dataPoints
        let loaded = this.state.current[0][ai].data[0][bi].userData.loaded;
        let requested = this.state.current[0][ai].data[0][bi].userData.requested;

        if (loaded === false && requested === false){
            this.getUpdatedUserData(eventName, data, ai, bi).then(async(returnState) =>
                await this.setState({
                    current: returnState
                })
            );
        }
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

    renderDifference(eventName, data, ai, bi) {       

        return (
            <div className="diffColumn">
            <div className="currentColumnTitle">
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

            </div>
        </div>
        );
    }

    getUpdatedUserData = async (eventName, datas, ai, bi) => {  

        let api = new getCurrent();

        let currentOld = JSON.stringify(this.state.current);
        let currents = JSON.parse(currentOld);
        let missile = currents[0][ai].data[0][bi];
        
        let childUpdate = currents[0][ai].data[0];

        let currentUserData = datas[bi];
        console.log(currentUserData)
        await api.getUserData(currentUserData.userData.name).then(async(res)=> {

            console.log(currentUserData.userData)
            if (res.status === 200) {
                missile.userData.failed = false;
                missile.userData.loaded = true;
                missile.userData.requested = true;
            }else {
                missile.failed = false;
                missile.loaded = false;
                missile.requested = true;
            }
        });
        return await currents
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