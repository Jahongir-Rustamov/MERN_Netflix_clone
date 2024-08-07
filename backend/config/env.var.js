import dotenv from "dotenv";
dotenv.config();

export const ENV_VARS = {
  Mongodb_Url: process.env.Mongodb_Url,
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET,
  Node_Env: process.env.Node_Env,
  TMDB_API_KEY: process.env.TMDB_API_KEY,
};
