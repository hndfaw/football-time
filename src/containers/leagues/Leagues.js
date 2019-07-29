import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import './leagues.css';
// import { fetchOneLeaguesMatches } from '../../apiCalls';
import { setTodaysMatches, setPremierLeague, setLeague1, setChampionsLeague, setBundesliga1, setPrimeraDivision, setSelectedLeague } from '../../actions';
import loading from '../../images/loading.gif';
import LeaguesTabs from '../leaguesTabs/LeaguesTabs';
import {Link} from 'react-router-dom';



export class Leagues extends Component {

  state = {
    searchTerm: ''
  }

  // componentDidMount() {
  //   fetchOneLeaguesMatches(524).then(data => {
  //     const cleanedData = this.cleanMatches(data.api.fixtures)
  //     this.props.handlePremierLeague(cleanedData)
  //   })
  // }



  selectLeaguesData = () => {
    console.log(this.props.x)
    const filteredMatches = this.props.x.filter(match =>  
      match.homeTeamName.toUpperCase().includes(this.state.searchTerm.toUpperCase()) ||
      match.awayTeamName.toUpperCase().includes(this.state.searchTerm.toUpperCase())
    )
    return filteredMatches.map(match => {

      return (
        <Link to={`/${match.league_id}`}  className="match-container" key={match.fixture_id}>
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
      {(match.statusShort === '1H' || match.statusShort === 'HT' || match.statusShort === '2H' || match.statusShort === 'ET' || match.statusShort === 'P' || match.statusShort === 'BT') ?
      <div className="match-elapsed-container">
        <p className="elapsed">{match.elapsed}'</p>
      </div> :
      <p className="date">{match.event_date}</p>}
      <p className="match-status">{match.status}</p>
    </Link>
      )}
    )
  }


  dataLoading = () => {
    const { selectedLeague } = this.props;
    const  dataLoading = (this.props[selectedLeague].length) === 0;
    return dataLoading
  }

  handleOnChange = e => {
    this.setState({searchTerm: e.target.value})
  }

  render() {
    
    return (
      <main className="main">
        <section className="league-tabs-container">
          <LeaguesTabs changeOneLeaguesMatches={this.props.changeOneLeaguesMatches}/>
          <input type="text" onChange={this.props.handleOnChange} placeholder="Search" className="search-bar"/>
        </section>
           {this.dataLoading() ?
          <img src={loading} className="loading" alt="loading icon" /> :
          this.selectLeaguesData()}
      </main>
    )
  }
}

Leagues.propTypes = {
  league525: PropTypes.array,
  league524: PropTypes.array,
  league530: PropTypes.array,
  league754: PropTypes.array,
  league775: PropTypes.array,
  selectedLeague: PropTypes.string,
}

export const mapStateToProps = state => ({
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

export default connect(mapStateToProps, mapDispatchToProps)(Leagues)
