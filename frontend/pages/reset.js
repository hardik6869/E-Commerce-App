import RequestReset from "../components/RequestReset";
import Reset from "../components/Reset";

const ResetPage = ({ query }) => {
  if (!query?.token) {
    <div>
      <p> Sorry You must supply a token </p>
      <RequestReset />
    </div>;
  }
  return (
    <div>
      {" "}
      <p>RESET YOUR PASSWORD {query.token}</p> <Reset token={query.token} />{" "}
    </div>
  );
};

export default ResetPage;
