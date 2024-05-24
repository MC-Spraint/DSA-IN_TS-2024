import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { LoggedInUser } from "./loggedin-user";

export class AuthService {
  private readonly secret: string;

  constructor() {
    this.secret = (process.env.JWT_SECRET as string) || "mysecretkey";
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    try {
      return bcrypt.compare(password, hashedPassword);
    } catch (error) {
      throw error;
    }
  }

  async generateToken(payload: JwtPayload): Promise<string> {
    return jwt.sign(payload, this.secret, { expiresIn: "1h" });
  }

  async verifyToken(token: string): Promise<JwtPayload | null> {
    try {
      const decoded = jwt.verify(token, this.secret) as LoggedInUser;
      return decoded;
    } catch (error) {
      console.error("Error verifying token:", error);
      return null;
    }
  }
}
