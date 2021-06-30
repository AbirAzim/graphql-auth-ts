import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { promisify } from "util";
import User from "./../models/userModel";
import AppError from "./appError";
import catchAsync from "./catchAsync";

export default catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		// 1) Getting token and check of it's there
    // console.log("here");
		// let token;
		// if (req.headers.authorization) {
		// 	token = req.headers.authorization.split(" ")[1];
		// }

		// if (!token) {
		// 	return next(
		// 		new AppError(
		// 			"You are not logged in! Please log in to get access.",
		// 			401
		// 		)
		// 	);
		// }

		// const decoded: any = await promisify(jwt.verify)(
		// 	token,
		// 	// @ts-ignore
		// 	process.env.JWT_SECRET
		// );

		// // 3) Check if user still exists
		// const currentUser = await User.findById(decoded.id);
		// if (!currentUser) {
		// 	return next(
		// 		new AppError(
		// 			"The user belonging to this token does no longer exist.",
		// 			401
		// 		)
		// 	);
		// }

		// // GRANT ACCESS TO PROTECTED ROUTE
		// // @ts-ignore
		// req.user = currentUser;
		// res.locals.user = currentUser;
		// next();
    const authHeader = req.get("Authorization");

    if(!authHeader) {
      // @ts-ignore
      req.isAuth = false;
      return next();
    }

    const token = authHeader.split(' ')[1]

    if(!token || token === ' ') {
      console.log("no token")
       // @ts-ignore
       req.isAuth = false;
       return next();
    }

    try { 
			const decoded: any = await promisify(jwt.verify)(
				token,
				// @ts-ignore
				process.env.JWT_SECRET
			);

			if(!decoded) {
				console.log("NOT FOUND")
				// @ts-ignore
				req.isAuth = false;
				return next();
			}
	
			const currentUser = await User.findById(decoded.id);
			if (!currentUser) {
				return new AppError(
						"The user belonging to this token does no longer exist.",
						401
					);
			}
			// GRANT ACCESS TO PROTECTED ROUTE
			// @ts-ignore
			req.user = currentUser;
    	// @ts-ignore
    	req.isAuth = true;
			next();
		} catch(e) {
			// @ts-ignore
			req.isAuth = false;
			next();
		}
	})