import { gql } from "@apollo/client/core";

export const ADD_TRANSACTION = gql`
  mutation AddMutation($addTransaction: Add!) {
    add(transaction: $addTransaction) {
      title
      date
    }
  }
`;
