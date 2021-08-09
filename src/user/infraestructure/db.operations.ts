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

  public async login(user: string, password: string) {
    let response = await usersSchema.findOne({ username: user });
    return response;
  }
}
