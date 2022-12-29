import { useRouter } from "next/router";
import Pagination from "../../components/Pagination";
import Products from "../../components/Products";

const ProductsPage = () => {
  const { query } = useRouter();
  const page = parseInt(query.page);
  return (
    <div>
      <Products page={page || 1} />
      <Pagination page={page || 1} />
    </div>
  );
};

export default ProductsPage;
