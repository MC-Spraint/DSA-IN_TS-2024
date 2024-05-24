import { Request, Response } from "express";
import UserService from "./user.service";

class UsersController {

  constructor() {
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
    this.protected = this.protected.bind(this);
  }

  async signup(req: Request, res: Response) {
    const { username, email, password } = req.body;

    try {
      const message = await UserService.signup(username, email, password);
      return res.status(201).json({ message });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const data = await UserService.login(email, password);
      return res.status(200).json({ data });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async protected(req: Request, res: Response) {
    try {
      return res.status(200).json({ msg: "This is a protected route" });
    } catch (error) {
      console.error("Error logging in:", error);
      return res.status(500).json({ message: "Server error" });
    }
  }
}

export default new UsersController();
