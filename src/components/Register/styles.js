import styled from "styled-components";
import defaultImage from '../../assets/default-user.png';

export const Container = styled.div`
  display: flex;
  margin-top: 5%;
  background-color: #FFF;
  border-radius: 5vw;
  align-items: center;
  
  .profilePicture{
    display:grid;
    width: 30%;
    margin-left: 1vw;
    margin-right: 1vw;
    height: 35vw;
    input {
      margin-left: auto;
      margin-right: auto;
      margin-top: -4vw;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      width: 15vw;
      text-align: center;
    }
  }

  .upload-box {
    height: 5vw;
    margin-bottom: 3vw;
  }
`;

export const FormRegister = styled.div `
  display: grid;
  grid-template-columns: auto auto;
  height: 40vw;
  justify-content: left;
  align-items: center;
  width: 70%;
  span {
    margin-left: auto;
    margin-right: auto;
    color: darkorange;
    font-weight: bolder;
    font-size: 2vw;
    font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    grid-column: 1 / 3;
  }
  
  .column-1{
    grid-column: 1;
    margin-right: 1vw;
    font-size: 1.2vw;
  }
  .column-2{
    grid-column: 2;
  }

  .item1{
    grid-row: 2;
  }

  .item2{
    grid-row: 3;
  }

  .item3{
    grid-row: 4;
  }

  .item4{
    grid-row: 5;
  }
  .item5{
    grid-row: 6;
  }
  .item6{
    grid-row: 7;
    grid-column: 1/3;
    margin-left: auto;
    margin-right: auto;
  }

  .item7{
    grid-row: 8;
    grid-column: 1/3;
    margin-left: auto;
    margin-right: auto;
  }

  .item8{
    grid-row: 9;
    grid-column: 1/3;
    margin-left: auto;
    margin-right: auto;
  }

  .buttons {
    display: grid;
    grid-row-gap: 10px;
    grid-column: 1/3;
    width: 80%;
    margin-left: auto;
    margin-right: auto;
  }
`;

export const ProfilePicture = styled.div ` 
  width: 16vw;
  height: 16vw;
  background-image: url(${props => props.src ? props.src : defaultImage});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  border-radius: 10vw;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right:auto;
  box-shadow: ${props => props.src ? "0 1px 20px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%), 0 5px 20px 4px rgb(0 0 0 / 9%)":null};
  display: grid;
  
  svg {
    height: 0em;
    width: 0em;
    margin-left: .5vw;
    color: tomato;
    cursor: pointer;
    border-radius: 10px;
    transition: height .3s, width .3s;
    
    :hover{
      transition: .2s;
      color: red;
      box-shadow:0 1px 20px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%), 0 5px 20px 4px rgb(0 0 0 / 9%);
    }
  }

  ${props => props.src ? ":hover{svg {height: 2em;width: 2em;: -2.2vw;}}":null}
`;