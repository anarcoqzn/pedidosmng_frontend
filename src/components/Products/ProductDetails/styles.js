import styled from 'styled-components';

export const Container = styled.div `
  margin: 5px;
  .back {
    cursor: pointer;
    width: 2vw;
    padding: 1vw;
    :hover {
      color: royalblue;
    }
  }
`;

export const SubContainer = styled.div `
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  ul{
    list-style: none;
    padding: 0;
  }
  li {
    margin-bottom: 1vw;

    button {
      margin-left: 0.3vw;  
    }
  }
`;

export const ImageContainer = styled.div`
  width: 30vw;
  margin: 5px;
  .previews {
    display: flex;
    justify-content: center;
  }
`;

export const ImagesSelect = styled.img ` 
  margin: 5px;
  height: 4vw;
  width: 4vw;
  border: 1px solid black;
  cursor: pointer;
  background-image: url(${props => props.src});
`;

export const Image = styled.img `
  height: 30vw;
  width: 30vw;
  border: 1px solid black;
  background-image: url(${props => props.src});
`;

export const Info = styled.div `
  flex: 1 1 0vw;
  padding: 1rem;
  b {
    font-size: 3vw;
  }
  span {
    color: #999;
    font-weight: bolder;
    font-size: 1.3vw;
  }
`;

export const Actions = styled.div `
  flex: 1 1 0vw;
  border: .1rem solid #808080;
  display: grid;
  height: 15vw;
  border-radius: 10px;
  font-size: 1.5vw;
  padding: 1rem;
  input {
    width: 4vw;
    margin-left: 1vw;
    text-align: center;
    border: 1px solid black;
    transition: box-shadow .3s border-color .3s;
    :hover{
      box-shadow:0 1px 10px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%), 0 5px 20px 4px rgb(0 0 0 / 9%);
      border-color: royalblue;
    }
  }

  #add-to-cart{
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    background: #f0c040;
    border: .1rem solid #f0c040;
    transition: .2s;
    font-weight: normal;

    :hover {
      border: .1rem solid black;
      color: black;
      background: orange;
    }
  }
`;


