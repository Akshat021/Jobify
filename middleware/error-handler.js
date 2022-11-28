import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {
  const defaultError = {
    StatusCodes: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong, try again later",
  };
  if (err.name === "ValidationError") {
    // we are handeling missing value as well as valid email
    defaultError.StatusCodes = StatusCodes.BAD_REQUEST;
    // defaultError.msg = err.message;
    defaultError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
  }
  if (err.code && err.code === 11000) {
    // registered email regestering again
    defaultError.msg = `${Object.keys(err.keyValue)} field has to be unique`;
  }

  res.status(defaultError.StatusCodes).json({ msg: defaultError.msg });
};

export default errorHandlerMiddleware;
