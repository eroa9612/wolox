import { GenericRepository } from "../../shared/application/base.respository";
import { UserModel } from "../domain/user.entity";
import { CriptoModel } from "../domain/cripto.entity";

export interface UserRepository extends GenericRepository<any> {
  list(): Promise<UserModel>;
  listCoin(currency: string): Promise<any>;
  topCripto(username: string): Promise<any>;
  insert(user: UserModel): Promise<string | UserModel>;
  insertCripto(
    username: any,
    cripto: CriptoModel
  ): Promise<string | CriptoModel>;
  login(user: string, password: string): Promise<any>;
  //insert(user: UserModel): UserModel;
}
