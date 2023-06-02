import createError from "http-errors";

export const responseHandler = {
  success: (res, data, message = "") => {
    return res.status(200).json({
      status: 200,
      message: message || "",
      data: data || null,
    });
  },
  unprocessableEntity: (res, message = "") => {
    const error = createError.UnprocessableEntity();
    return res.status(200).json({
      status: error.status,
      message: message || "",
    });
  },
  tokenInValid: (res, message = "") => {
    return res.status(200).json({
      status: 401,
      message: message || "",
    });
  },
  unauthorized: (res, message = "") => {
    const error = createError.Unauthorized();

    return res.status(200).json({
      status: error.status,
      message: message || "",
    });
  },
  forbidden: (res, message = "") => {
    const error = createError.Forbidden();

    return res.status(200).json({
      status: error.status,
      message: message || "You're not allowed to do that!",
    });
  },
  internalServerError: (res) => {
    const error = createError.InternalServerError();

    return res.status(200).json({
      status: error.status,
      message: error.message,
    });
  },
  notFound: (res, message = "") => {
    const error = createError.NotFound();

    return res.status(200).json({
      status: error.status,
      message: message || error.message,
    });
  },
  conflict: (res, message = "") => {
    const error = createError.Conflict();

    return res.status(200).json({
      status: error.status,
      message: message || error.message,
    });
  },
};
