import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/env.var.js";

const generateJWTToken = (UserId, res) => {
  const accessToken = jwt.sign({ UserId }, ENV_VARS.JWT_SECRET, {
    expiresIn: "15d",
  });
  res.cookie("jwt-netflix", accessToken, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: ENV_VARS.Node_Env !== "development",
  });
};
export { generateJWTToken };
