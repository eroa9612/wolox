import { GenericRepository } from "../../shared/application/base.respository";
import { UserModel } from "../domain/user.entity";

export interface UserRepository extends GenericRepository<any> {
  list(): Promise<UserModel>;
  insert(user: UserModel): Promise<string | UserModel>;
  //insert(user: UserModel): UserModel;
}
