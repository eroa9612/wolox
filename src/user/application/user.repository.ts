import { GenericRepository } from "../../shared/application/base.respository";
import { UserModel } from "../domain/user.entity";
import { CriptoModel } from "../domain/cripto.entity";

export interface UserRepository extends GenericRepository<any> {
  list(): Promise<any>;
  listCoin(currency: string): Promise<any>;
  topCripto(username: string): Promise<any>;
  insert(user: UserModel): Promise<any>;
  insertCripto(username: any, cripto: CriptoModel): Promise<any>;
  login(user: string, password: string): Promise<any>;
  //insert(user: UserModel): UserModel;
}
