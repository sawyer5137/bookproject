module.exports = validateUserAccess = (req, res, next) => {
  const userIdFromParams = req.params.userId;
  const userIdFromSession = req.session?.user?.userId;

  if (!userIdFromSession) {
    return res
      .status(401)
      .json({ message: "You must be logged in to access this resource." });
  }

  if (userIdFromParams !== userIdFromSession.toString()) {
    return res
      .status(403)
      .json({ message: "You do not have permission to access this resource." });
  }

  next();
};
