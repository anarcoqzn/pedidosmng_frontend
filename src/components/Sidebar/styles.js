import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 5px;
  background-color: #FFF;
  width: 100%;
  height: inherit;
`;

export const Item = styled.div`
  background: #FFF;
  border-radius: 4px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  :hover{
    transition:.3s;
    color: white;
    background: #DB7093;
  }
`;
