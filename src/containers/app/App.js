import React, {Component} from 'react';
import './App.css';
import { connect } from 'react-redux';
import { fetchTodaysMatches, fetchLeagues } from '../../apiCalls';
import { setTodaysMatches, leaguesAction } from '../../actions';
import  Header  from '../header/Header';
import  Leagues  from '../leagues/Leagues';
import { Route, Switch, NavLink, Redirect } from 'react-router-dom';


export class App extends Component {

   today = () => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    return (yyyy + '-' + mm + '-' + dd);
  }

  componentDidMount() {

    fetchTodaysMatches(this.today()).then(data =>
      this.props.handleTodaysMatches(data.api.fixtures))

    fetchLeagues().then(data =>
      this.props.handleLeagues(data.api.leagues))

  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => (
            <>
               <Header />
              <Leagues />
            </>
          )} />
          <Route render={() => (
            <h1>THE PAGE YOU TRIED TO ACCESS DOES NOT EXIST!</h1>
          )}/>
        </Switch>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  oneDayDate: state.oneDayDate
})

export const mapDispatchToProps = dispatch => ({
  handleTodaysMatches: data => dispatch(setTodaysMatches(data)),
  handleLeagues: data => dispatch(leaguesAction(data)),
})


export default connect(mapStateToProps, mapDispatchToProps)(App);
