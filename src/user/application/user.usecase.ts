import { UserRepository } from "./user.repository";
import { UserModel } from "../domain/user.entity";

export class UserUseCase {
  constructor(private operationsDB: UserRepository) {
    this.operationsDB = operationsDB;
  }

  async list(): Promise<UserModel> {
    return await this.operationsDB.list();
  }

  async insert(user: UserModel): Promise<string | UserModel> {
    return await this.operationsDB.insert(user);
  }
}
