import UpdateProduct from "../components/UpdateProduct";

const UpdatePage = ({ query }) => {
  return <UpdateProduct id={query.id} />;
};

export default UpdatePage;
