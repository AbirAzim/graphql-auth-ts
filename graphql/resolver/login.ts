import jwt from "jsonwebtoken";
import { loginSchema} from "../../validation";
import User from "../../models/userModel"
import AppError from "./../../utils/appError";

const signToken = (id: string) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};


export default async (args) => {
  const email = args.userLogin.email;
  const password = args.userLogin.password;

  const { error } = loginSchema.validate({
    email: email,
    password: password,
  });

  if(!error) {
    const user: any = await User.findOne({
      email,
    }).select("+password");

    if (!user || !(await user.isPasswordCorrect(password, user.password))) {
      return new AppError('Wrong Email or Password', 401);
    } else {
      const token = signToken(user._id);

      // Remove password from output
      user.password = undefined;

      return { 
        _id: user._id,
        token
      }
    }
  }
}