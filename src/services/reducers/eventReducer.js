import eventConstants from '../constants/event';

function eventListReducer(state = {events:[]}, action){

  switch (action.type) {
    case eventConstants.EVENT_LIST_REQUEST:
      return {loading: true};
    case eventConstants.EVENT_LIST_SUCCESS:
      return {loading: false, events: action.payload};
    case eventConstants.EVENT_LIST_FAIL:
      return {loading: false, error: action.payload};
    default :
    return state;
  }
}

function eventDetailsReducer(state = {event:{}}, action){
  switch (action.type) {
    case eventConstants.EVENT_DETAILS_REQUEST:
      return {loading: true};
    case eventConstants.EVENT_DETAILS_SUCCESS:
      return {loading: false, event: action.payload};
    case eventConstants.EVENT_DETAILS_FAIL:
      return { loading: false, error: action.payload};
    default :
      return state;
  }
}
export {eventListReducer, eventDetailsReducer}
