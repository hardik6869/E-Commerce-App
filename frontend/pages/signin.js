import styled from "styled-components";
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
    </GridStyles>
  );
};

export default SignInPage;
