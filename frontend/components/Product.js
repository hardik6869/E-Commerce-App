import Link from "next/link";
import formatMoney from "../lib/formatMoney";
import ItemStyle from "./styles/ItemStyle";
import PriceTag from "./styles/PriceTag";
import Title from "./styles/Title";

const Product = ({ product }) => {
  return (
    <ItemStyle>
      <img
        src={product?.photo?.image?.publicUrlTransformed}
        alt={product.name}
      />
      <Title>
        <Link href={`/product/${product.id}`}> {product.name} </Link>
      </Title>
      <PriceTag> {formatMoney(product.price)} </PriceTag>
      <p> {product.description} </p>
    </ItemStyle>
  );
};
export default Product;
