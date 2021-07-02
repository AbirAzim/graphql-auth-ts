import expressSession from 'express-session'

export default expressSession({
  secret: 'mySecret',
  resave: true,
  saveUninitialized: true
})