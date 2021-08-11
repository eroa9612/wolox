import { UserRepository } from "./user.repository";
import { UserModel } from "../domain/user.entity";
import { UserService } from "./user.services";
import { CriptoModel } from "../domain/cripto.entity";

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

  async topCripto(username: string): Promise<any> {
    return await this.operationsDB.topCripto(username);
  }

  async insert(user: UserModel): Promise<any> {
    const verify = await UserService.validatePassowrd(user.password);
    if (verify) {
      user.password = await UserService.cryptPassword(user.password);
      return await this.operationsDB.insert(user);
    } else {
      const result = {
        data: "La contraseña debe tener al menos 8 caracteres",
        status: 400,
      };
      return result;
    }
  }
  async insertCripto(username: any, cripto: CriptoModel): Promise<any> {
    return await this.operationsDB.insertCripto(username, cripto);
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
        const result = { data: tokenReturn, status: 200 };
        return result;
      } else {
        const result = { data: "Contraseña incorrecta", status: 400 };
        return result;
      }
    } else {
      const result = { data: "Usuario no existe", status: 404 };
      return result;
    }
  }
}
