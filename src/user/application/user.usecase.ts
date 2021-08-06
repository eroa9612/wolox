import { UserRepository } from "./user.repository";
import { UserModel } from "../domain/user.entity";

export class UserUseCase {
  operationsDB: UserRepository;

  constructor(operationsDB: UserRepository) {
    this.operationsDB = operationsDB;
  }

  async list(): Promise<UserModel> {
    return this.operationsDB.list();
  }

  // insert(user: UserModel) {
  //   this.operationsDB.insert(user);
  // }
}
