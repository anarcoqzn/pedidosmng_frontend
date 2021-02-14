import React, { useEffect, useState } from 'react'
import {FcCalendar} from 'react-icons/fc';
import {FiLink} from 'react-icons/fi';
import {CgArrowRight} from 'react-icons/cg';
import { Link } from 'react-router-dom';

import { Container, Info } from './styles';
import StartEndDate from '../../StartEndDate';

export default function EventCard(props) {
  const [event, setEvent] = useState({});
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  
  useEffect (() => {
    
    setEvent(props.event);
    const dates = StartEndDate(props.event.startDate, props.event.endDate);
    setStartDate(dates[0]);
    setEndDate(dates[1]);
  }, [props.event]);

  return (
    <Container>
      
      <FcCalendar size={60} style={{marginBottom:"auto"}}/>
      <Info>
        <span className="title" onClick={()=>props.eventClick(event)}>{event.title}</span>
        <span className="description">{event.description}</span>
        <span className="date">{startDate}<CgArrowRight size={"1.5em"}/>{endDate}</span>
      </Info>
      <Link className="link" to={"/eventos/"+event._id}>
        <FiLink size={30}/>
      </Link>
    </Container>
  )
}
