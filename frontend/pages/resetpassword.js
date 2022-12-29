import styled from "styled-components";
import RequestReset from "../components/RequestReset";

const GridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 4rem;
`;

const ResetPasswordPage = () => {
  return (
    <GridStyles>
      <RequestReset />
    </GridStyles>
  );
};

export default ResetPasswordPage;
