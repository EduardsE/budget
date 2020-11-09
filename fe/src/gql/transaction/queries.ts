import { gql } from "@apollo/client/core";

export const GET_TRANSACTIONS = gql`
  query Query {
    transactions {
      title
      date
    }
  }
`;
