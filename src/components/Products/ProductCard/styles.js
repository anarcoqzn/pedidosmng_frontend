import styled from 'styled-components';

export const Card = styled.div`
  width: 15vw;
  height: 21vw;
  transition: box-shadow .3s,border-color .3s;
  border: 1px solid #f0f0f0;
  :hover {
    box-shadow:0 1px 20px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%), 0 5px 20px 4px rgb(0 0 0 / 9%);
  }
`;

export const ProductInfo = styled.div `
  display: grid;
  height: 5vw;
  background-color: #FFF;
  font-size: 1.1vw;
  align-items: center;
  justify-items: center;

  #value {
    font-size: 1.29vw;
    font-weight: bolder;
  }

  #description {
    font-size: 0.9vw;
    color: #999;
    font-weight: bolder;
    text-align: center;
  }
`;

export const Image = styled.div `
  width: auto;
  height: 16vw;
  background-image: url(${props => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
`;
