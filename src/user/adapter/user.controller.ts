import { Request, Response } from "express";
import { UserUseCase } from "../application/user.usecase";
import { UserModel } from "../domain/user.entity";
import { UserOperation } from "../infraestructure/db.operations";
import { UserRepository } from "../application/user.repository";

const userOperation: UserRepository = new UserOperation();
const userUseCase = new UserUseCase(userOperation);

export class UserController {
  async list(req: Request, res: Response) {
    const response: UserModel = await userUseCase.list();
    res.status(200).json(response);
  }

  async listCoin(req: Request, res: Response) {
    const currency: any = req.query.currency;
    const response: any = await userUseCase.listCoin(currency);
    res.status(200).json(response);
  }

  async insert(req: Request, res: Response) {
    const { nombre, apellido, username, password, moneda } = req.body;
    const user: UserModel = { nombre, apellido, username, password, moneda };
    const response: any = await userUseCase.insert(user);
    res.status(200).json(response);
  }

  async login(req: Request, res: Response) {
    const { username, password } = req.body;
    const response: string = await userUseCase.login(username, password);
    res.status(200).json(response);
  }
}
