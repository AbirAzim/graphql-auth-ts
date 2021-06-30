import User from "../../models/userModel"
import AppError from "./../../utils/appError";

export default async (args, req) => { 
  if(req.isAuth === false) {
    return new AppError("The user is not logged in or token expired", 401);
  }

  try {
    const users = await User.find();
    return users;
  } catch(e) {
    return new AppError("faild", 501);
  }
}