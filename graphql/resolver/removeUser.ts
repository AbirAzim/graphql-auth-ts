import User from "../../models/userModel"
import AppError from "./../../utils/appError";
import restrict from "./../../authorization/restrict"

export default async (args, req) => {
  if(req.isAuth === false) {
    return new AppError("The user is not logged in or token expired", 401);
  }

  if(restrict(['admin'], req.user)) {
    const doc = await User.findOneAndDelete({_id: args.userId})
    return doc;
  }else {
    return new AppError("The user is not authorized to do this", 403);
  }
}