import styled from 'styled-components';

export const Container = styled.div`
  p {
    display: flex;
    justify-content: center;
  }

  .create-cancel-btns {
    display: flex;
    flex-wrap:wrap;
    justify-content: center;

    .btn-space {
      margin-right:3px;
      margin-bottom: 3px;
    }
  } 

  .products{
    display: flex;
    justify-content: center;
    margin-left: 10vw;
    margin-bottom: 4px;
    margin-top: -10px;
    max-width: 80%;
  }
`;
