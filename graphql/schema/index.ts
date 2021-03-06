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
      forgetPassword(email: String): String
      resetPassword(token: String, newPassword: String): String
      removeUser(userId: String): User
      updatePassword(currentPassword: String, newPassword: String): String
    }

    schema {
      query: rootQuery
      mutation: rootMutation
    }
`)