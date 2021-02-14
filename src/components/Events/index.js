import React, {useState, useEffect} from 'react'
import {Container, CardContainer, SubContainer} from './styles';
import NewEvent from './NewEvent';
import { Button } from '../Button/styles';
import EventCard from './EventCard';
import { useDispatch, useSelector } from 'react-redux';
import { listEvents } from '../../services/actions/eventActions';

export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [ newEvent, setNewEvent ] = useState(false);
  const [loadEvents, setLoadEvents ] = useState(false);

  const {events, loading, error} = useSelector(state => state.eventList);
  const dispatch = useDispatch();

  useEffect(()=>{
    setSelectedEvent(null);
    setNewEvent(false);
    dispatch(listEvents());
    
  },[loadEvents, dispatch]);

  function handleEventClick(event){
    setSelectedEvent(event);
    setNewEvent(true);
  }

  return (
    loading?<div>CARREGANDO ...</div> :
    error ? <div>{error}</div> :
    newEvent ? <NewEvent setNewEvent={setNewEvent} setLoadEvents={setLoadEvents} event={selectedEvent}/> :
    <Container> 
      <Button color="#32CD32" onClick={()=>setNewEvent(true)}>Novo</Button>
      
      <SubContainer>
      {events.map((event) => {  
        return <CardContainer key={event._id}> 
                <EventCard event={event} eventClick={handleEventClick}/>
               </CardContainer>
        })}
      </SubContainer>
    </Container>
  )
}
