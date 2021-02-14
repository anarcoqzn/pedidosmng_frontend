import { EVENT_DETAILS_FAIL, EVENT_DETAILS_REQUEST, EVENT_DETAILS_SUCCESS, EVENT_LIST_FAIL, EVENT_LIST_REQUEST, EVENT_LIST_SUCCESS } from "../constants";

function eventListReducer(state = {events:[]}, action){

  switch (action.type) {
    case EVENT_LIST_REQUEST:
      return {loading: true};
    case EVENT_LIST_SUCCESS:
      return {loading: false, events: action.payload};
    case EVENT_LIST_FAIL:
      return {loading: false, error: action.payload};
    default :
    return state;
  }
}

function eventDetailsReducer(state = {event:{}}, action){
  switch (action.type) {
    case EVENT_DETAILS_REQUEST:
      return {loading: true};
    case EVENT_DETAILS_SUCCESS:
      return {loading: false, event: action.payload};
    case EVENT_DETAILS_FAIL:
      return { loading: false, error: action.payload};
    default :
      return state;
  }
}
export {eventListReducer, eventDetailsReducer}
