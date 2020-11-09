import { gql } from "@apollo/client/core";

export const ADD_TRANSACTION = gql`
  mutation AddMutation($addTransaction: AddTransactionInput!) {
    add(transaction: $addTransaction) {
      title
      date
    }
  }
`;
