import { GenericRepository } from "../../shared/application/base.respository";
import { UserModel } from "../domain/user.entity";

export interface UserRepository extends GenericRepository<any> {
  list(): Promise<UserModel>;
  listCoin(currency: string): Promise<any>;
  insert(user: UserModel): Promise<string | UserModel>;
  login(user: string, password: string): Promise<any>;
  //insert(user: UserModel): UserModel;
}
