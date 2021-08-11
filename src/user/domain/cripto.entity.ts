import { Schema, model } from "mongoose";

export interface CriptoModel {
  nombre: [{ cripto: string }];
}

const criptoSchema: Schema = new Schema(
  {
    nombre: [
      {
        cripto: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);
export default model<CriptoModel>("Cripto", criptoSchema);
