import SingleProduct from "../../components/SingleProduct";

const singleProductPage = ({ query }) => {
  return <SingleProduct id={query.id} />;
};

export default singleProductPage;
