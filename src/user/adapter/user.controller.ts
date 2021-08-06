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
}
