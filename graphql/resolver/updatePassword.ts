import User from "../../models/userModel"
import AppError from "./../../utils/appError";

export default async (args, req) => {
  if(req.isAuth === false) {
    return new AppError("The user is not logged in or token expired", 401);
  }
  const user = await User.findById(req.user.id).select('+password');

  if (!user.isPasswordCorrect(args.currentPassword, user.password)) {
    return new AppError('password mismatched', 401);
  }
  // 2. update password
  user.password = args.newPassword;
  user.passwordConfirm = req.body.passwordConfirm;

  await user.save();
  return "success"
}