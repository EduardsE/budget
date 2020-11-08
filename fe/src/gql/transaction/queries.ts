import { gql } from "@apollo/client";

export const GET_TRANSACTIONS = gql`
  query Query {
    transactions {
      title
      date
    }
  }
`;
