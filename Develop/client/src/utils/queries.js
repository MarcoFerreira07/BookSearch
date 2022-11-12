import { gql } from "@apollo/client";

export const GET_ME = gql`
  query user($username: String!) {
    query me {
    me {
      _id
      username
      email
      password
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
}
`;
