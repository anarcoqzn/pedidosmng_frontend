import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 10px;
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #444;
    & + li {
      margin-top: 10px;
    }
    
    .value-cart {
      display: block;

      p {
        margin-bottom: auto;
      }
    }
  }
`;

export const FileInfo = styled.div `
  display: flex;
  align-items: center;

  .info {
    display: flex;
    flex-direction: column;
    margin-left:5px;

    span {
      font-size: 0.9vw;
      color: #999;

    }
    strong {
      font-size: 1.1vw;
    }
    button.delete {
      border: 0;
      background: transparent;
      color: #e57878;
      margin-left: 5px;
      cursor: pointer;
      font-size: 1vw;
    }

    p{
      font-size: 1vw;
    }
  }
`;