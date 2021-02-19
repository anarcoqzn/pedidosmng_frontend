import styled, { keyframes } from 'styled-components';

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Loading = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  
  border-top: 2px solid grey;
  border-right: 2px solid grey;
  border-bottom: 2px solid grey;
  border-left: 4px solid royalblue;
  background: transparent;
  width:2vw;
  height: 2vw;
  border-radius: 50%;
  display: flex;
  margin-top: 30vw;
  margin-left: auto;
  margin-right: auto;
`;
