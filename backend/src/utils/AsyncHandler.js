const asyncHandler = (fn) => {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch((error) => {
      next(error);
    });
  };
};

export default asyncHandler;
