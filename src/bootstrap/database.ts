import mongoose, { ConnectOptions } from "mongoose";
import config from "./config";

(async () => {
  try {
    const mongooseOptions: ConnectOptions = {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    };
    const db = await mongoose.connect(
      `mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@cluster0.rcquc.mongodb.net/${config.MONGO_DATABASE}?retryWrites=true&w=majority`,
      mongooseOptions
    );
    console.log("conectado a la BD to:", db.connection.name);
  } catch (error) {
    console.error(error);
  }
})();
