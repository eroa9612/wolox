import { UserRepository } from "../application/user.repository";
import usersSchema, { UserModel } from "../domain/user.entity";
import { CoinService } from "./services.coin";

export class UserOperation implements UserRepository {
  public async list(): Promise<UserModel> {
    const result: any = await usersSchema.find();
    return result;
  }

  public async listCoin(currency: string): Promise<any> {
    const listCoins: any = await CoinService.getCoins(currency);
    return listCoins;
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
