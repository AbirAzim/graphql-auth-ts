import compression from "compression";
import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import { graphqlHTTP } from "express-graphql";
import passport from "passport";

import AppError from "./utils/appError";
import graphqlSchema from "./graphql/schema"
import resolver from "./graphql/resolver"
import isAuth from "./authorization/protect"
import GoogleStrategy from "./provider/googleProvider"
import FacebookStrategy from "./provider/facebookProvider"
import expressSession from "./utils/expressSession"


// Start express app
const app: Application = express();

app.enable("trust proxy");

// Implement CORS
app.use(cors());

// Development logging
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

// Limit requests from same API
const limiter = rateLimit({
	max: 100,
	windowMs: 60 * 60 * 1000,
	message: "Too many requests from this IP, please try again in an hour!",
});




app.use("/graphql", limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

app.use(compression());

passport.use(GoogleStrategy)
passport.use(FacebookStrategy)

passport.serializeUser((user, callback) => {
  callback(null, user);
})

passport.deserializeUser((user, callback) => {
  callback(null, user);
})

app.use(expressSession)

app.get('/login/google', passport.authenticate('google', {scope: ['profile email']}))
app.get('/login/facebook', passport.authenticate('facebook', {scope: ['email']}))

app.get('/google', passport.authenticate('google'), (req, res) => {
  res.redirect('/')
})

app.get('/facebook', passport.authenticate('facebook'), (req, res) => {
  res.redirect('/')
})

app.use(isAuth)

app.use("/graphql", graphqlHTTP({
	schema: graphqlSchema,
	rootValue: resolver,
	graphiql: true
}))

app.all("*", (req: Request, res: Response, next: NextFunction) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// app.use(globalErrorHandler);

module.exports = app;
