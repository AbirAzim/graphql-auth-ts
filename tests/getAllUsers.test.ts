import { mockServer } from 'graphql-tools';
import casual from 'casual-browserify';
import User from 'models/userModel';

let users = [{
    '_id': '1', 'role': 'user', 'name': 'test001', 'email': 'test@tet.com', 'password' : 'password125'
}];
const schema = `
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
`;
 
// Mock functions are defined per type and return an
// object with some or all of the fields of that type.
// If a field on the object is a function, that function
// will be used to resolve the field if the query requests it.
const server = mockServer(schema, {
    rootQuery : () => ({
        getAllUsers: () => (
            users
        ),
  }),
});
 
// server.query(`
//     getAllUsers
// `)

describe(`getAllUsers test suite`, () => {
    test('getAllUsers should return the users array', async () => {
        let response = await server.query(`getAllUsers`);
        console.log(response);
        
        let result = response.data.users;
        expect(result[0]._id).toBe('1')
    })
})