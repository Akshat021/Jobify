import { UnAuthonticatedError } from "../errors/index.js";

const checkPermissions = (requestUser, resourseUserId) => {
  // whole user object is passed so that we can check for role. for instance if Admin is accessing
  if (requestUser.userId === resourseUserId.toString()) return;

  throw new UnAuthonticatedError("Not authorized to access this route");
};

export default checkPermissions;
