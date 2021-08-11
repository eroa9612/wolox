import { UserRepository } from "../application/user.repository";
import usersSchema, { UserModel } from "../domain/user.entity";
import { CoinService } from "./services.coin";
import criptoSchema, { CriptoModel } from "../domain/cripto.entity";

export class UserOperation implements UserRepository {
  public async list(): Promise<any> {
    const result: any = await usersSchema.find();
    const response = { data: result, status: 200 };
    return response;
  }

  public async listCoin(currency: string): Promise<any> {
    const listCoins: any = await CoinService.getCoins(currency);
    return listCoins;
  }

  public async topCripto(username: string): Promise<any> {
    if (username != null) {
      const user: any = await usersSchema
        .findOne({ username: username })
        .populate("cripto");
      const result: any = await CoinService.top(user.cripto, user.moneda);
      return result;
    } else {
      const result = { data: "Agregar parametros de usuario", status: 400 };
      return result;
    }
  }

  public async insert(user: UserModel) {
    const verifyUser = await usersSchema.findOne({ username: user.username });
    if (verifyUser) {
      const result = {
        data: "El usuario ya se encuentra registrado",
        status: 400,
      };
      return result;
    } else {
      let response = await usersSchema.create(user);
      const result = { data: response, status: 200 };
      return result;
    }
  }

  public async insertCripto(username: any, cripto: CriptoModel) {
    const criptomoneda = await criptoSchema.create(cripto);
    await usersSchema.findOneAndUpdate(
      { username: username },
      { cripto: criptomoneda._id }
    );
    const result = {
      data: "Cripto monedas agregadas al usuario" + " " + username,
      status: 200,
    };
    return result;
  }

  public async login(user: string, password: string) {
    let response = await usersSchema.findOne({ username: user });
    return response;
  }
}
