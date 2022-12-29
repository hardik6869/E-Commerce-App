import { useQuery } from "@apollo/client";
import { gql } from "graphql-tag";
import Head from "next/head";
import styled from "styled-components";
import formatMoney from "../lib/formatMoney";

const ProductStyles = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 5px;
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  max-height: 800px;
  min-height: 200px;
  max-width: var(--maxWidth);
  justify-content: center;
  align-items: top-center;
  gap: 2rem;
  img {
    width: 100%;
    object-fit: contain;
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    border-radius: 5px;
  }
  .details {
    justify-content: center;
    align-items: center;
  }
`;

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      name
      price
      description
      id
      photo {
        altText
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const SingleProduct = ({ id }) => {
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: { id },
  });
  if (loading) return <p> Loading ...</p>;
  if (error) return <p> Error</p>;

  const { Product } = data;
  return (
    <ProductStyles>
      <Head>
        <title>Sick Fits | {Product.name}</title>
      </Head>
      <img
        src={Product.photo.image.publicUrlTransformed}
        alt={Product.photo.altText}
      />
      <div className="details">
        <h2>{Product.name}</h2>
        <h4> {Product.description} </h4>
        <h3> {formatMoney(Product.price)} </h3>
      </div>
    </ProductStyles>
  );
};

export default SingleProduct;
