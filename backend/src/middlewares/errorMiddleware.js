// Middleware to handle all errors
export const errorMiddleware = (
  err,
  req,
  res,
  next
) => {
  const statusCode = err.statusCode || 500;
  const message = "Internal Server Error";

  if (err.name === "ZodError") {
    res.status(400).json({
      message: "Invalid Credientials",
      errors: err.errors.map((er) => ({
        field: er.path.join("."), // Shows the exact field that has an issue
        message: er.message,
      })),
    });
    return;
  } else if (err.name === "ApiError") {
    res.status(err.statusCode).json({ message: err.message });
    return;
  }

  if (process.env.NODE_ENV === "development") {
    console.log(err);
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
  return;
};
