import { UserModel } from "../domain/user.entity";

export interface UserRepository {
  list(): Promise<UserModel>;
  //insert(user: UserModel): UserModel;
}
