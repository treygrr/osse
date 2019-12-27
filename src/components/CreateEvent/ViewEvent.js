import React from 'react';
import { Link } from 'react-router-dom';
import './ViewEvent.css';
import img from './clicktosee.png'

class View extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
          list: []
      }
      this.getData();
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
                    {this.listCardsOut(this.props.selectionName)}
                </div>
            );
        }
    }

    listCardsOut(selection) {
        let lister = this.state.list[0];
        if (lister.length){
            for (let i = 0; lister.length > i; i++) {
                if (selection === lister[i].eventName){
                    let datas = lister[i].data;
                        let userData = datas[0]
                        return(
                            userData.map((data, index) => 
                                <div key={index} className="cardOuterWrapper">
                                    {this.listSingleCard(data.userData, index)}
                                </div>
                            )

                        )
                    
                }
            }
        }
    }

    getStartingSkill(exp) {
        let skills = exp.dataPoints;
        console.log(skills)
        return (
            Object.keys(skills).map((data, index)=>
                
                <div className="skillWrapper">
                    {console.log(data)}
                    <div className="skillHolder">{data}</div>
                    <div className="skillHolder">{skills[data].rank}</div>
                    <div className="skillHolder">{skills[data].level}</div>
                    <div className="skillHolder">{skills[data].xp}</div>
                </div>
            )
            
            
        );
    }

    listSingleCard(data, index) {
        return (
            <>
                <div className="cardTitle">username: {data.name}</div>
                <div className="cardInnerWrapper">
                    <div className="startColumn">
                        <div className="startColumnTitle">starting stats</div>
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
                            {this.getStartingSkill(data.expData)}
                        </div>
                    </div>
                    <div className="currentColumn">
                        <div className="currentColumnTitle">current stats</div>
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
                            {this.getStartingSkill(data.expData)}
                        </div>
                    </div>
                    <div className="diffColumn">diff</div>
                </div>
           </>
        );
    }

    getData(){
        let data = JSON.parse(localStorage.getItem('listicles'));
        let news = this.state.list.push(data);
        this.setState({
            list: news
        });
    }

    componentDidUpdate () {
        // console.log(this.state.list);
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