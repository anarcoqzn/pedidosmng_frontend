import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  max-width: 40%;
  width: fit-content;
  margin: 30px;
  background: #FFF;
  border-radius: 10px;
  padding: 20px;
  
  #cart-icon {
    cursor : pointer;
    :hover {
      color: royalblue;
      transition: .2s;
    }
  }
  .item {
    display: flex;
    span{ 
      margin-left: 5px;
    }
  }
  .manager-item {
    display: block;
  }

 
  button {
    display: flex;
    margin-left:auto;
  }

`;

export const ProductsContainer = styled.div`
  #text {
    display: flex;
    justify-content: center;
    margin-top: 3px;
    font-weight: bolder;
  }
  #product-container {
    display: flex;
    flex-wrap:wrap;
    justify-content: center;
    #product {
      margin: 5px;
    }
  }
`;