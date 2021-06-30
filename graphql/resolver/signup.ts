import { signupSchema } from "../../validation";
import User from "../../models/userModel"
import AppError from "./../../utils/appError";

export default async (args) => {

  const name = args.userSignup.name;
  const email = args.userSignup.email;
  const password = args.userSignup.password;

  const { error, value } = signupSchema.validate({
		name: name,
		email: email,
		password: password,
	});

  if(!error) {
    const user = {
      name: value.name,
      email: value.email,
      password: value.password,
    }
  
    const newUser = await User.create(user)
    return { ...newUser._doc, password: null, _id: newUser.id};
  } else {
    console.log(error)
  }
}