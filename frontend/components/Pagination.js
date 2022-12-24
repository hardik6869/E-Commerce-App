import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import PaginationStyles from "./styles/PaginationStyle";
import DisplayError from "./ErrorMessage";
import { perPage } from "../config";

export const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    _allProductsMeta {
      count
    }
  }
`;

const Pagination = ({ page }) => {
  const { loading, error, data } = useQuery(PAGINATION_QUERY);
  if (loading) return "Loading...";
  if (error) return <DisplayError error={error} />;
  const { count } = data._allProductsMeta;
  const pageCount = Math.ceil(count / perPage);
  return (
    <PaginationStyles>
      <Head>
        <title>
          
          Sick Fits {page} of {pageCount}
        </title>
      </Head>
      <Link href={`/products/${page - 1}`} legacyBehavior>
        <a aria-disabled={page <= 1}> {"<<"} Prev </a>
      </Link>
      <p>
        {page} Page of {pageCount}
      </p>
      <p> {count} Items Total </p>
      <Link href={`/products/${page + 1}`} legacyBehavior>
        <a aria-disabled={page >= pageCount}> Next {">>"} </a>
      </Link>
    </PaginationStyles>
  );
};
export default Pagination;
