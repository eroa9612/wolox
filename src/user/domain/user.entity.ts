import { Schema, model } from "mongoose";

export interface UserModel {
  nombre: string;
  apellido: string;
  username: string;
  password: string;
  moneda: string;
}

const usersSchema: Schema = new Schema(
  {
    nombre: { type: String },
    apellido: { type: String },
    username: { type: String, required: true },
    password: { type: String, required: true },
    moneda: { type: String },
    cripto: { type: Schema.Types.ObjectId, ref: "Cripto" },
  },
  {
    timestamps: true,
  }
);
export default model<UserModel>("Users", usersSchema);
