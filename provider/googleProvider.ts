import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

export default new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/google'
}, (accessToken, refreshToken, profile, callback) => {
  callback(null, profile)
})