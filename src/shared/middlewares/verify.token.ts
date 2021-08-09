import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import moment from "moment";

const secretToken: any = "clavesecreta";
async function verifyToken(req: Request, res: Response, next: NextFunction) {
  try {
    const token: any = req.headers.token;
    const payload: any = jwt.decode(token, secretToken);
    if (!req.headers.token) {
      return res.status(401).send({
        message: "Sin Cabecera De Autenticación",
      });
    } else if (payload.exp <= moment().unix()) {
      return res.status(402).send({
        message: "Token Expirado",
      });
    } else if (payload.estado === 1) {
      next();
    } else {
      return res.status(403).send({
        message: "No tiene permisos para acceder",
      });
    }
  } catch (e) {
    res.status(400).send("Invalid Token");
    next();
  }
}

export default {
  verifyToken,
};
