import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Head from "next/head";
import OrderItemStyles from "../components/styles/OrderItemStyles";
import Link from "next/link";
import styled from "styled-components";
import formatMoney from "../lib/formatMoney";
import ErrorMessage from "../components/ErrorMessage";

const USER_ORDERS_QUERY = gql`
  query USER_ORDERS_QUERY {
    allOrders {
      id
      charge
      total
      user {
        id
      }
      items {
        id
        name
        description
        price
        quantity
        photo {
          image {
            publicUrlTransformed
          }
        }
      }
    }
  }
`;

const OrderUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 4rem;
`;

const CountItemsInAnOrder = (order) => {
    console.log(order);
  return order.items.reduce((tally, item) => tally + item.quantity, 0);
};

const OrdersPage = ({ query }) => {
  const { data, error, loading } = useQuery(USER_ORDERS_QUERY, {
    variables: { id: query.id },
  });
  if (loading) return <p> Loading... </p>;
  if (error) return <ErrorMessage error={error} />;
  const { allOrders } = data;

  return (
    <div>
      <Head>
        <title>Your Orders ({allOrders.length})</title>
      </Head>
      <h2> YOu have {allOrders.length} orders! </h2>
      <OrderUl>
        {allOrders.map((order) => (
          <OrderItemStyles>
            <Link href={`order/${order.id}`}>   
              <div className="order-meta">
                <p> {CountItemsInAnOrder(order)} Items</p>
                <p>
                  {" "}
                  {order.items.length} Product{" "}
                  {order.items.length === 1 ? "" : "s"}{" "}
                </p>
                <p> {formatMoney(order.total)} </p>
              </div>
              <div className="images">
                {order.items.map((item) => (
                  <img
                    src={item.photo?.image?.publicUrlTransformed}
                    alt={item.name}
                    key={`image-${item.id}`}
                  />
                ))}
              </div>
            </Link>
          </OrderItemStyles>
        ))}
      </OrderUl>
    </div>
  );
};

export default OrdersPage;
