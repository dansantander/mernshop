// We create a fallback for 404 errors
// that triggers specially if you go to
// a not defined route
const notFound = (req, res, next) => {
  // We throw an error by creating a new Error
  const error = new Error(`Not Found ${req.originalUrl}`);
  res.status(404);
  next(error);
}

const errorHandler = (err, req, res, next) => {
  // Sometimes we get 200 status eventhough we have an error
  // so we set it to 500 or to the statusCode
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  })
}

export {
  notFound,
  errorHandler
}