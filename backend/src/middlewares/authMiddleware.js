import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError";

// Middleware to check if the user is authenticated
export const authMiddleware = (
  req,
  res,
  next
) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Assuming Bearer token format

  if (!token) {
    next(new ApiError(401, "Unauthorized access. Token missing."));
    return;
  }

  try {
    const decoded = jwt.verify(token, getEnv("JWT_SECRET"));
    if (!decoded) {
      next(new ApiError(401, "Unauthorized access. Invalid token."));
      return;
    }
    // TODO:Check if the user exists
    req.user = decoded; // Attach user info to request object (e.g., userId and role)
    next();
  } catch (error) {
    next(new ApiError(401, "Unauthorized access. Invalid token."));
  }
};

// Middleware to check if the user has a specific role
export const roleMiddleware = (roles) => {
  return (req, res, next) => {
    if (!req.user || roles.includes(req.user.role)) {
      res
        .status(403)
        .json({ message: "Forbidden access. Insufficient permissions." });
      return;
    }
    next();
  };
};
