import mongoose from "mongoose";
import { ENV_VARS } from "./env.var.js";
export async function mongodb() {
  try {
    await mongoose
      .connect(ENV_VARS.Mongodb_Url)
      .then(() => {
        console.log("Successfully connected with DB");
      })
      .catch(() => {
        console.log("Error with DB");
      });
  } catch (error) {
    console.log(error);
  }
}
