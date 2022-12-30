import Link from "next/link";
import formatMoney from "../lib/formatMoney";
import AddToCart from "./AddToCart";
import DeleteProduct from "./DeleteProduct";
import ItemStyles from "./styles/ItemStyles";
import PriceTag from "./styles/PriceTag";
import Title from "./styles/Title";
import { useUser } from "./User";

const Product = ({ product }) => {
  const me = useUser();
  console.log(me);
  return (
    <ItemStyles>
      <img
        src={product?.photo?.image?.publicUrlTransformed}
        alt={product.name}
      />
      <Title>
        <Link href={`/product/${product.id}`}> {product.name} </Link>
      </Title>

      <PriceTag> {formatMoney(product.price)} </PriceTag>

      <p> {product.description} </p>
      {me && (
        <div className="buttonList">
          <Link href={{ pathname: "update", query: { id: product.id } }}>
            Edit
          </Link>
          <AddToCart id={product.id} />
          <DeleteProduct id={product.id}> Delete </DeleteProduct>
        </div>
      )}
    </ItemStyles>
  );
};

export default Product;
