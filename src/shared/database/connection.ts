import mongoose from "mongoose";

export async function connectToDatabase() {
  const user = process.env.MONGO_USER;
  const pass = process.env.MONGO_PASS;
  const host = process.env.MONGO_HOST;
  const port = process.env.MONGO_PORT;
  const db = process.env.MONGO_DB;

  const uri = `mongodb://${user}:${pass}@${host}:${port}/${db}?authSource=admin`;

  try {
    await mongoose.connect(uri);
    console.log("MongoDB conectado com sucesso");
  } catch (error) {
    console.error("Erro ao conectar no MongoDB:", error);
    process.exit(1);
  }
}
