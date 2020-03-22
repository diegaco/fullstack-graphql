const { gql } = require('apollo-server')

/**
 * Type Definitions for our Schema using the SDL.
 */
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
  }

  type Pet {
    id: ID!
    name: String!
    createAt: String!
    type: String
  }

  input PetInput {
    name: String
    type: String
  }

  type Query {
    user(id: ID!): User
    pet(input: PetInput): Pet
    pets(input: PetInput): [Pet]!
    users: [User]!
  }

`;

module.exports = typeDefs
