const { gql } = require('apollo-server')

/**
 * Type Definitions for our Schema using the SDL.
 */
const typeDefs = gql`

  type User {
    id: ID!
    username: String!
    pets: [Pet]!
  }

  type Pet {
    id: ID!
    name: String!
    createAt: String!
    type: String
    owner: User!
  }

  input UserInput {
    username: String
  }

  input NewUserInput {
    username: String
  }

  input PetInput {
    name: String
    type: String
  }

  input NewPetInput {
    name: String!
    type: String!
  }

  type Query {
    user(input: UserInput): User
    users(input: UserInput): [User]!
    pet(input: PetInput): Pet
    pets(input: PetInput): [Pet]!
  }

  type Mutation {
    newPet(input: NewPetInput!): Pet!
    newUser(input: NewUserInput!): User!
  }

`;

module.exports = typeDefs
