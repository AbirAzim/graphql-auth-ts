const crypto = require('crypto');
import User from "../../models/userModel"
import AppError from "./../../utils/appError";

export default async (args, req) => {
  console.log(args);
  const hashedToken = crypto
    .createHash('sha256')
    .update(args.token)
    .digest('hex');

  console.log(hashedToken);

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetTokenExpiresIn: { $gt: Date.now() },
  });

  //2. If the token is not expireds and user found update the password
  if (!user) {
    return new AppError('Token is invalid!', 400);
  }
  user.password = args.newPassword;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpiresIn = undefined;
  //3. Update the changedPasswordPropertty for the user

  await user.save();
  return "Password Successfully Reset"
}