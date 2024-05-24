import { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service";

const jwtService = new AuthService();

export async function authExtractPayloadMiddleware(
  req: any,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No token provided" });

  const decoded = await jwtService.verifyToken(token);
  if (!decoded) return res.status(403).json({ message: "Invalid token" });

  req.user = {};
  req.user._id = decoded._id;
  req.user.username = decoded.username;
  req.user.email = decoded.email;
  next();
}

export default authExtractPayloadMiddleware;
