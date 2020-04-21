//State argument is not application this.state.
//just the state this reducer is responsible for
export default function(state = null, action){
  switch(action.type){
    case 'BOOK_SELECTED':
      return action.payload;
    default:
      break;
  }
  return state;
}
