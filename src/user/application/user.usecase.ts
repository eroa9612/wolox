import { UserRepository } from "./user.repository";
import { UserModel } from "../domain/user.entity";
import { UserService } from "./user.services";

export class UserUseCase {
  constructor(private operationsDB: UserRepository) {
    this.operationsDB = operationsDB;
  }

  async list(): Promise<UserModel> {
    return await this.operationsDB.list();
  }

  async listCoin(currency: string): Promise<any> {
    return await this.operationsDB.listCoin(currency);
  }

  async insert(user: UserModel): Promise<any> {
    //const userPwd = Object.assign({}, user);
    const verify = await UserService.validatePassowrd(user.password);
    if (verify) {
      user.password = await UserService.cryptPassword(user.password);
      return await this.operationsDB.insert(user);
    } else {
      return "La contraseña debe tener al menos 8 caracteres";
    }
  }

  async login(user: string, password: string): Promise<any> {
    const userData: any = await this.operationsDB.login(user, password);
    if (userData) {
      const validatePwd: boolean = await UserService.comparePassword(
        userData.password,
        password
      );
      if (validatePwd) {
        const tokenReturn: string = await UserService.token(userData._id);
        return tokenReturn;
      } else {
        return "Contraseña incorrecta";
      }
    } else {
      return "Usuario no existe";
    }
  }
}
