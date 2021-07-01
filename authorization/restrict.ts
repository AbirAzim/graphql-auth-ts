import AppError from "../utils/appError";

// @ts-ignore
export default ( roles, user ) => {
  // @ts-ignore
  if(!roles.includes(user.role)){
    return false;
  } else {
    return true;
  }
}