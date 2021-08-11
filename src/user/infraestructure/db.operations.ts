import { UserRepository } from "../application/user.repository";
import usersSchema, { UserModel } from "../domain/user.entity";
import { CoinService } from "./services.coin";
import criptoSchema, { CriptoModel } from "../domain/cripto.entity";

export class UserOperation implements UserRepository {
  public async list(): Promise<UserModel> {
    const result: any = await usersSchema.find();
    return result;
  }

  public async listCoin(currency: string): Promise<any> {
    const listCoins: any = await CoinService.getCoins(currency);
    return listCoins;
  }

  public async topCripto(username: string): Promise<any> {
    const user: any = await usersSchema
      .findOne({ username: username })
      .populate("cripto");
    const result: any = await CoinService.top(user);

    return "result";
  }

  public async insert(user: UserModel) {
    const verifyUser = await usersSchema.findOne({ username: user.username });
    if (verifyUser) {
      return "El usuario ya se encuentra registrado";
    } else {
      let response = await usersSchema.create(user);
      return response;
    }
  }

  public async insertCripto(username: any, cripto: CriptoModel) {
    const criptomoneda = await criptoSchema.create(cripto);
    await usersSchema.findOneAndUpdate(
      { username: username },
      { cripto: criptomoneda._id }
    );
    return "Cripto monedas agregadas al usuario" + " " + username;
  }

  public async login(user: string, password: string) {
    let response = await usersSchema.findOne({ username: user });
    return response;
  }
}
