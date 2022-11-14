const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    bookCount: Int
    savedBooks: [Book]!
  }
  type Book {
    bookId: String
    authors: [String]!
    title: String
    description: String
    image: String
    link: String
  }
  input BookInput{
    bookId: String
    authors: [String]!
    title: String
    description: String
    image: String
    link: String
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
    addBook(userId: ID!, bookId: String!, authors: [String]!, title:String!, description: String!, image:String!, link: String): User
    removeBook(userId: ID!, bookId: String!): User
    removeUser(userId: ID!): User
  }
`;

module.exports = typeDefs;