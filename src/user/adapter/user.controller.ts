import { Request, Response } from "express";
import { UserUseCase } from "../application/user.usecase";
import { UserModel } from "../domain/user.entity";
import { UserOperation } from "../infraestructure/db.operations";
import { UserRepository } from "../application/user.repository";
import { CriptoModel } from "../domain/cripto.entity";

const userOperation: UserRepository = new UserOperation();
const userUseCase = new UserUseCase(userOperation);

export class UserController {
  async list(req: Request, res: Response) {
    const response: any = await userUseCase.list();
    res.status(response.status).json(response.data);
  }

  async listCoin(req: Request, res: Response) {
    const currency: any = req.query.currency;
    const response: any = await userUseCase.listCoin(currency);
    res.status(response.status).json(response.data);
  }

  async topCripto(req: Request, res: Response) {
    const username: any = req.query.username;
    const response: any = await userUseCase.topCripto(username);
    res.status(response.status).json(response.data);
  }

  async insert(req: Request, res: Response) {
    const { nombre, apellido, username, password, moneda } = req.body;
    const user: UserModel = { nombre, apellido, username, password, moneda };
    const response: any = await userUseCase.insert(user);
    res.status(response.status).json(response.data);
  }

  async insertCripto(req: Request, res: Response) {
    const criptos = req.body;
    console.log(criptos);
    const username = req.query.username;
    const response: any = await userUseCase.insertCripto(username, criptos);
    res.status(response.status).json(response.data);
  }

  async login(req: Request, res: Response) {
    const { username, password } = req.body;
    const response: any = await userUseCase.login(username, password);
    res.status(response.status).json(response.data);
  }
}
