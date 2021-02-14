import styled from 'styled-components';

export const HeaderContainer = styled.header`
  width: 100%;
  height: 60px;
  background:royalblue;
  font-size: 18px;
  font-weight: bold;
  display: flex;
  align-items: center;
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

  div {
    margin-right: auto;
    margin-left: 2px;
    display: flex;

    #point {
      color:darkorange;
    }
    #cristo {
      color:darkorange;
      margin-left: 2px;
    }
  }

  img {
    height: 50px;
  }
`;
