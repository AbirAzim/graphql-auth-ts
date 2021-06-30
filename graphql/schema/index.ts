import { buildSchema } from "graphql";

export default buildSchema(`
    type User {
      _id: ID!
      role: String!
      name: String!
      email: String!
      password: String
    }

    type AuthData {
      _id: ID!
      token: String!
    }

    input UserSignup {
      name: String!
      email: String!
      password: String!
    }

    input UserLogin {
      email: String!
      password: String!
    }

    type rootQuery {
      login(userLogin: UserLogin): AuthData
      getAllUsers: [User!]!
    }

    type rootMutation {
      signUp(userSignup: UserSignup): User
    }

    schema {
      query: rootQuery
      mutation: rootMutation
    }
`)