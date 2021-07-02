import { Strategy as FacebookStrategy } from 'passport-facebook';

export default new FacebookStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: '/facebook',
  profileFields: ['email', 'displayName', 'name', 'picture']
},(accessToken, refreshToken, profile, callback) => {
  callback(null, profile)
})