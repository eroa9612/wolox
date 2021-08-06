import { UserRepository } from "../application/user.repository";
import usersSchema, { UserModel } from "../domain/user.entity";

export class UserOperation implements UserRepository {
  public async list(): Promise<UserModel> {
    const result: any = await usersSchema.find();
    return result;
  }

  public async insert(user: UserModel) {
    let response = await usersSchema.create(user);
    return response;
  }
}
