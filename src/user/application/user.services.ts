import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import moment from "moment";

export class UserService {
  static async validatePassowrd(password: string): Promise<any> {
    if (password.length > 7) {
      return Promise.resolve(true);
    } else {
      return Promise.resolve(false);
    }
  }

  static async cryptPassword(password: string): Promise<string> {
    console.log(password.length);
    password = await bcrypt.hash(password, 10);
    return Promise.resolve(password);
  }

  static async comparePassword(
    password: string,
    passwordCrypt: string
  ): Promise<boolean> {
    const match = await bcrypt.compare(passwordCrypt, password);
    if (match) {
      return Promise.resolve(true);
    } else {
      return Promise.resolve(false);
    }
  }

  static async token(id: string): Promise<any> {
    const payload = {
      id,
      estado: 1,
      iat: moment().unix(),
      exp: moment().add(1, "hours").unix(),
    };
    return jwt.sign(payload, "clavesecreta");
  }
}
