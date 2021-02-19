import styled from 'styled-components';
import React from 'react'

const ErrorStyle = styled.div`
  display: flex;
  height: fit-content;
  width: fit-content;
  max-width: 40vw;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 15vh;
  margin-bottom: 30vh;
  border: 1px solid tomato;
  border-radius: 10px;
  color: tomato;
  font-weight: bolder;
  font-size: 2vw;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  padding: 10px;
`;
export default function Error(props) {
  return (
    <ErrorStyle>
      {props.msg}
    </ErrorStyle>
  )
}


