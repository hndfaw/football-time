export const championsLeagueReducer = (state = [], action) => {
  switch(action.type) {
    
    case 'SET_CHAMPIONS_LEAGUE':
        console.log('reducer champions legue')
      return action.matches
      default:
      return state;
  }
}

