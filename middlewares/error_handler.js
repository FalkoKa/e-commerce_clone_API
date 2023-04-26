function errorHandler(err, req, res, next) {
  console.log(err);

  // the err object has message but it doent have the status
  // but would be nice to have both
  const { message, status = 500 } = err;

  // resond with json
  res.status(status).json({ status, message });
}

module.exports = errorHandler;
