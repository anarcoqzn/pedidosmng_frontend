import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  h3 {
    margin-left: auto;
    margin-right: auto;
    margin-bottom: -1vw;
    font-size: 2vw;
  }
`;

export const CartList = styled.div `
  width: 70vw;
  ul {
    list-style-type: none;
  }

  h3 {
    margin-left: 1vw;
  }
  .cart-list-container{
    padding: 0px;
    list-style-type: none;
    
  }
`;

export const CartAction = styled.div `
  width:30vw;
  background-color: #f0f0f0;
  display: grid;
  span {
    margin-left: auto;
    margin-right: auto;
    font-size: 2vw;
  }
  #subtotal {
    font-size: 2vw;
    margin-top: -2vw;
    color: #900020;
  }
  button {
    width: 100%;
    height: 3vw;
    cursor: pointer;
    background: orange;
    border: .1rem solid #f0c040;
    transition: .2s;
    font-weight: bolder;
    border-radius: 1vw;
    font-size: 1.5vw;
    :hover {
      border: .1rem solid black;
      color: black;
      background: darkorange;
    }
  }
`;

export const Item = styled.li `
  display: flex;
  border-bottom: 0.1rem #c0c0c0 solid;
  flex-wrap: nowrap;
  background: white;
  height: 8vw;
  align-items: center;
 
  img {
    margin-left: 1vw;
    width: 7vw;
  }
  .item-name {
    h2{
      margin-bottom: 0vw;
      font-size: 1.5vw;
    }
    
    span{
      font-size: 1.1vw;
    }
    margin-left: 1vw;
    input {
      width: 4vw;
      text-align: center;
      border: 1px solid black;
      transition: box-shadow .3s border-color .3s;
        :hover{
          box-shadow:0 1px 10px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%), 0 5px 20px 4px rgb(0 0 0 / 9%);
          border-color: royalblue;
        }
      }
    }

  .item-price {
    display: grid;
    margin-left: auto;
    margin-right: 1vw;
    font-size: 1.2vw;

    span{
      margin-left: auto;
      margin-right: auto;
    }
    button {
      margin-left: auto;
      margin-right: auto;
      width: 1vw;
      border: 0px;
      background-color: transparent;
      color: tomato;
      cursor:pointer;
      transition: .25s;
      :hover{
        color: red;
      }
    }
  }
`;