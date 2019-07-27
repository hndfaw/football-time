import React from 'react';
import { MatchContainer, mapStateToProps } from './MatchesContainer';
import { shallow } from 'enzyme';


describe('MatchContainer', () => {

  it('should match the snapshot', () => {
    let mockMatch = [{
      awayTeamLogo: "https://www.api-football.com/public/teams/3700.png",
      awayTeamName: "Always Ready",
      event_date: "2019-07-31",
      fixture_id: 201290,
      homeTeamLogo: "https://www.api-football.com/public/teams/3709.png",
      homeTeamName: "Royal Pari",
      league_id: 476,
      statusShort: "PST",
    }] 
    let wrapper = shallow(<MatchContainer todaysMatches={mockMatch}/>)
    expect(wrapper).toMatchSnapshot()
  })

})