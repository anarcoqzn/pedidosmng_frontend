import styled from 'styled-components';

export const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-top: 10%;
  margin-bottom: 10%;
  width: 50vw;
  height: 30vw;
  background-color: #FFF;
  justify-content: center;
  display: grid;
  align-items: center;
  border-radius: 5vw;
  grid-template-rows: auto auto auto auto auto;
  span {
    margin-left: auto;
    margin-right: auto;
    color: darkorange;
    font-weight: bolder;
    font-size: 2vw;
    font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  .buttons {
    display: grid;
    grid-row-gap: 10px;
    margin-top: -2vw;
  }
  #error{
    font-size: 1.2vw;
    height: .5vw;
    color: tomato;
  }
  #email{
    grid-row: 3;
  }
  #password{
    grid-row: 4;
    margin-top: -2vw;
  }
`;

export const Input = styled.input`
  width: 30vw;
  height: 3vw;
  transition: box-shadow .3s,border .3s;
  border: 1px solid #f0f0f0;
  font-size: 1.2vw;
  padding: 10px;
  border-radius: .5vw;
  
  :hover {
    box-shadow:0 1px 20px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%), 0 5px 20px 4px rgb(0 0 0 / 9%);
    border: 1px solid lightblue;
  }

  :focus {
    box-shadow:0 1px 20px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%), 0 5px 20px 4px rgb(0 0 0 / 9%);
    border: 1px solid royalblue;
  }
  ${props => props.wrong ? "border: 1px dashed coral;":null}
`
