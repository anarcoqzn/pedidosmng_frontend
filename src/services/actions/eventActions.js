import { EVENT_LIST_FAIL, EVENT_LIST_REQUEST, EVENT_LIST_SUCCESS,
         EVENT_DETAILS_FAIL, EVENT_DETAILS_REQUEST, EVENT_DETAILS_SUCCESS } from "../constants";
import api from "../api";

const listEvents = () => async (dispatch) => {

  try{
    dispatch({type: EVENT_LIST_REQUEST});
    const {data} = await api.get("/event");
    dispatch({type: EVENT_LIST_SUCCESS, payload: data});
  }catch(err){
    dispatch({type: EVENT_LIST_FAIL, payload: err.message});
  }
}

const eventDetails = (eventID) => async (dispatch) => {
  try {
    dispatch({type: EVENT_DETAILS_REQUEST, payload: eventID});
    const {data} = await api.get('/event/'+eventID);
    dispatch({type: EVENT_DETAILS_SUCCESS, payload: data});
  } catch (error) {
    dispatch({type: EVENT_DETAILS_FAIL, payload: error.message});
  }
}

export {listEvents, eventDetails};