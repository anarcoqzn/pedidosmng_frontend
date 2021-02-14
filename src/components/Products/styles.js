import styled from 'styled-components';

export const Container = styled.div `
  button {
    margin-left:5px;
    font-weight:bolder;
    margin-top: 5px;
  }

  p{
    display: flex;
    justify-content: center;
    font-weight:bolder;
    margin-top: 10px;
    margin-bottom: 0px;
  }
`;

export const SubContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const CardContainer = styled.div ` 
  margin-left: 5px;
  margin-top: 5px;
  cursor: pointer;
  border: ${props => (props.products && props.products.find(p => p._id === props.id)) ? '2px solid #32CD32':'0px'}
`
