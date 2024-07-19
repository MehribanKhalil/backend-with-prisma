export const errorHandler = (err, req, res, next) => {
  console.error("Error: ", err);
  
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong!";

  res.status(statusCode).json({
    statusCode,
    message,
  });
};
