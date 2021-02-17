import eventConstants from '../constants/event';
import api from "../api";

const listEvents = () => async (dispatch) => {

  try{
    dispatch({type: eventConstants.EVENT_LIST_REQUEST});
    const {data} = await api.get("/event");
    dispatch({type: eventConstants.EVENT_LIST_SUCCESS, payload: data});
  }catch(err){
    dispatch({type: eventConstants.EVENT_LIST_FAIL, payload: err.message});
  }
}

const eventDetails = (eventID) => async (dispatch) => {
  try {
    dispatch({type: eventConstants.EVENT_DETAILS_REQUEST, payload: eventID});
    const {data} = await api.get('/event/'+eventID);
    dispatch({type: eventConstants.EVENT_DETAILS_SUCCESS, payload: data});
  } catch (error) {
    dispatch({type: eventConstants.EVENT_DETAILS_FAIL, payload: error.message});
  }
}

export {listEvents, eventDetails};