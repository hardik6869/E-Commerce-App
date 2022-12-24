import styled from "styled-components";
import RequestReset from "../components/RequestReset";
import SignIn from "../components/SignIn";
import SignUp from "../components/signUp";

const GridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 4rem;
`;

const SignInPage = () => {
  return (
    <GridStyles>
      <SignIn /> <SignUp />
      <RequestReset />
    </GridStyles>
  );
};

export default SignInPage;
