import React, { Component } from 'react';
import {connect} from 'react-redux';
import './leagues.css';
import { fetchOneLeaguesMatches } from '../../apiCalls';
import { setTodaysMatches, setPremierLeague, setLeague1, setChampionsLeague, setBundesliga1, setPrimeraDivision, setSelectedLeague } from '../../actions';


export class League extends Component {

  componentDidMount() {
    fetchOneLeaguesMatches(524).then(data => {
      const cleanedData = this.cleanMatches(data.api.fixtures)
      this.props.handlePremierLeague(cleanedData)
    })
  }

  cleanMatches = data => {
    const cleanedData = data.map(match => {
      const date = match.event_date.split("").slice(0, 10).join("")
        return {
          event_date: date,
          league_id: match.league_id,
          statusShort: match.statusShort,
          fixture_id: match.fixture_id,
          homeTeamName: match.homeTeam.team_name,
          homeTeamLogo: match.homeTeam.logo,
          awayTeamName: match.awayTeam.team_name,
          awayTeamLogo: match.awayTeam.logo
        }
      })
      return cleanedData;
  }

  changeOneLeaguesMatches = e => {
    let id = parseInt(e.target.id)
    this.props.handleSelectedLeague(`league${id}`)

    this.props[`league${id}`].length === 0 ?

    fetchOneLeaguesMatches(id).then(data => {
      const cleanedData = this.cleanMatches(data.api.fixtures)
      if (id === 525) {
        this.props.handleLeague1(cleanedData)
      } else if (id === 530) {
        this.props.handleChampionsLeague(cleanedData)
      } else if (id === 754) {
        this.props.handleBundesliga1(cleanedData)
      } else {
        this.props.handlePrimeraDivision(cleanedData)
      }
    })
    .then(() => this.selectLeaguesData())
    : this.selectLeaguesData()
  }

  selectLeaguesData = () => {
    return this.props[this.props.selectedLeague].map(match => {
        return (
        <section className="match-container" key={match.fixture_id}>
      <div className="match-second-container">
      <p className="team-name home-team-name">{match.homeTeamName}</p>
      <div className="logos-result-container">
        <div className="home-team-logo-container">
          <img src={match.homeTeamLogo} alt="home team logo" className="small-logo" />
        </div >
        <h4 className="results">{match.goalsHomeTeam}<span> - </span>{match.goalsAwayTeam}</h4>
        <div className="away-team-logo-container">
          <img src={match.awayTeamLogo} alt="away team logo" className="small-logo" />
        </div>
      </div>
      <p className="team-name away-team-name">{match.awayTeamName}</p>
      </div>
      {(match.statusShort !== 'MF' && match.statusShort !== 'NS' && match.statusShort !== 'TBD') ? <div className="match-status">
        <p className="status-content">{match.elapsed}'</p>
      </div> : <p className="date">{match.event_date}</p>}
    </section>
      )}
    )
  }

  leagueTab = () => {
    const {selectedLeague, leaguesData } = this.props;
    let selectedId = parseInt(selectedLeague.slice(6,9))
    
    const leagueTab = leaguesData.map(league => {
      const btnStyle = (selectedId === league.league_id) ? {background: 'rgba(0,0,0,0.1)'} : null
      return (
        <div onClick={this.changeOneLeaguesMatches} className="league-tab" key={league.league_id}>
          <button style={btnStyle} className="league-btn" id={league.league_id}></button>
          <div className="league-tab-inner-container">
            <img src={league.logo} alt="league logo" className="league-tab-logo" />
            <h4 className="league-tab-name">{league.name}</h4>
          </div>
        </div>
      )
    })
    return leagueTab
  }

  render() {

    return (
      <main className="main">
        <section className="league-tabs-container">
          {this.leagueTab()}
        </section>
        <section>
          {this.selectLeaguesData()}
        </section>
      </main>
    )
  }
}

export const mapStateToProps = state => ({
  leaguesData: state.leaguesData,
  league524: state.league524,
  league525: state.league525,
  league530: state.league530,
  league754: state.league754,
  league775: state.league775,
  selectedLeague: state.selectedLeague
})

export const mapDispatchToProps = dispatch => ({
  handleTodaysMatches: data => dispatch(setTodaysMatches(data)),
  handlePremierLeague: data => dispatch(setPremierLeague(data)),
  handleLeague1: data => dispatch(setLeague1(data)),
  handleChampionsLeague: data => dispatch(setChampionsLeague(data)),
  handleBundesliga1: data => dispatch(setBundesliga1(data)),
  handlePrimeraDivision: data => dispatch(setPrimeraDivision(data)),
  handleSelectedLeague: leagueName => dispatch(setSelectedLeague(leagueName))
})

export default connect(mapStateToProps, mapDispatchToProps)(League)
