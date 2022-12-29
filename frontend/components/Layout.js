import styled, { createGlobalStyle } from "styled-components";
import Header from "./Header";

const GlobalStyles = createGlobalStyle`
  html {
    --red: #ff0000;
    --black: #393939;
    --grey: #3A3A3A;
    --grey: var(--grey)
    --lightGrey: #e1e1e1;
    --lightGray: var(--lightGray);
    --offWhite: #ededed;
    --maxWidth: 1500px;
    --bs: 0 12px 24px 0 rgba(0,0,0,0.9);
    box-sizing: border-box;
    font-size : 10px
  }
  *, *:before, *:after{
    box-sizing:inherit;
  }
  body{
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    padding:0;
    margin:0;
    font-size:1.5rem;
    line-height:2;
  }
  a{
    text-decoration:none;
    color: var(--black);
  }
  a:hover{
    text-decoration:underline;
  }
`;

const InnerStyles = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 2rem;
`;

const Layout = ({ children }) => {
  return (
    <div>
      <GlobalStyles />
      <Header />
      <InnerStyles>{children}</InnerStyles>
    </div>
  );
};

export default Layout;
