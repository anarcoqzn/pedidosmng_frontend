import styled from 'styled-components';

export const Container = styled.div`
  display:flex;
  height: 70px;
  width: fit-content;
  border: 1px solid rgba(205, 92, 92,0.3);
  border-radius:10px;
  background-color: #FFF;
  transition: box-shadow .3s, border-color .3s;
  overflow: auto;

  :hover {
    box-shadow:0 1px 20px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%), 0 5px 20px 4px rgb(0 0 0 / 9%);
    border-color: rgba(205, 92, 92,0.8);
  }

  .link {
    display:inline-table;
    margin-left: auto;
    margin-top: auto;
    margin-bottom: auto;
    margin-right: 10px;
    color: #6495ED;
    
    :hover {
      color: royalblue;
      transition: .2s;
    }
  }
`;

export const Info = styled.div`
  display: grid;
  font-weight:bolder;
  margin-left: 5px;
  .title {
    font-size: 18px;
    cursor:pointer;
    transition: color .3s;
    :hover{
      color:cornflowerblue;
      text-decoration:underline;
    }
  }

  .description {
    color: #999;
    margin-right: 5px;
  }
  .date { 
    display: flex;
    font-size:12px;
    color:#999;
  }
`;


