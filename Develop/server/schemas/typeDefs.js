const { gql } = require("apollo-server-express");
const typeDefs = gql`
  type Book {
    bookId: String
    authors: [String]!
    title: String
    description: String
    image: String
    link: String
  }
  type User {
    _id: ID
    username: String
    email: String
    password: String
    bookCount: Int
    savedBooks: [Book]!
  }
  type Auth {
    token: ID!
    user: User
  }
  type Query {
  me: User
  }
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(userId: ID!, bookId: String!, authors: [String]!, title:String!, description: String!, image:String!, link: String): User
    removeBook(userId: ID!, bookId: String!): User
`;
module.exports = typeDefs;

