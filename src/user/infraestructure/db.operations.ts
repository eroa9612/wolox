import { UserRepository } from "../application/user.repository";
import usersSchema, { UserModel } from "../domain/user.entity";

export class UserOperation implements UserRepository {
  public async list(): Promise<UserModel> {
    const result: any = await usersSchema.find();
    console.log(result);
    return result;
  }

  // insert(user: User) {
  //   return user;
  // }
}
