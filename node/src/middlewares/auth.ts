import jwt from "jsonwebtoken";
import { JwtUser } from "../types/jwt";

export const auth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  
  const tokenValue = token.split(" ")[1];
  try {
    const decoded = <JwtUser>jwt.verify(tokenValue, process.env.JWT_SECRET_KEY);
    req.currentUserId = decoded.userId;
    return next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};
