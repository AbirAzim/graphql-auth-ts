import User from "../../models/userModel"
import AppError from "./../../utils/appError";
import restrict from "./../../authorization/restrict"

export default async (args, req) => { 
  if(req.isAuth === false) {
    return new AppError("The user is not logged in or token expired", 401);
  }

  if(restrict(['admin'], req.user)) {
    try {
      const users = await User.find();
      return users;
    } catch(e) {
      return new AppError("faild", 501);
    }
  } else {
    return new AppError("The user is not authorized to do this", 403);
  }
}