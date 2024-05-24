import User from "./user.schema";
import { AuthService } from "../core/services/auth.service";

class UserService {
  private readonly authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async signup(username: string, email: string, password: string) {
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser)
        throw new Error("User already exists");

      const newUser = new User({
        username,
        email,
        password: await this.authService.hashPassword(password),
      });
      await newUser.save();

      return "User created successfully";
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Server error");
    }
  }

  async login(email: string, password: string) {
    try {
      const user = await User.findOne({ email });
      if (!user) throw new Error("User not found");

      const isMatch = await this.authService.comparePassword(
        password,
        user.password
      );
      if (!isMatch) throw new Error("Invalid credentials");

      const payload = {
        _id: user._id,
        username: user.username,
        email: user.email,
      };

      const token = await this.authService.generateToken(payload);

      return { id: user._id, email: user.email, token };
    } catch (error) {
      console.error("Error logging in:", error);
      throw new Error("Server error");
    }
  }
}

export default new UserService();
