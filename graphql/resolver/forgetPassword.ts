import User from "../../models/userModel"
import AppError from "./../../utils/appError";
import sendEmail  from "./../../utils/email";

export default async (args, req) => {
  const email = args.email;
  // 1. get user from email

  const user = await User.findOne({ email});
  
  if (!user) return new AppError('user with this email not found', 404);
  // 2. generate token
  const credentials = user.createPasswordResetToken();
  try {
    await User.findOneAndUpdate({ email}, credentials);
    const message = `Your token -> ${credentials.passwordToken} to reset password`;

    await sendEmail({
      email: user.email,
      subject: 'Your password reset token valid for 10 min only!',
      message,
    });
  
    return "Email has been sent"
  
    } catch (err) {
      await User.findOneAndUpdate({ email}, {passwordResetToken: undefined, passwordResetTokenExpiresIn : undefined});
      return new AppError('There is an error sending the email. Please try again.',500)
  } 
}