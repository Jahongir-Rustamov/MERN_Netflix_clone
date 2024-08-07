import express from "express";
import authrouter from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import { ENV_VARS } from "./config/env.var.js";
import { mongodb } from "./config/db.js";
import TvRoutes from "./routes/tv.route.js";
import { protectRoute } from "./middleware/protectRoute.js";
import cookieParser from "cookie-parser";
import SearchRoutes from "./routes/search.route.js";
import path from "path";
mongodb();
const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth", authrouter);
app.use("/api/v1/movie", protectRoute, movieRoutes);
app.use("/api/v1/tv", protectRoute, TvRoutes);
app.use("/api/v1/search", protectRoute, SearchRoutes);

const PORT = ENV_VARS.PORT || 3000;
const __dirname = path.resolve();

if (process.env.Node_Env === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
  });
}
app.listen(PORT, () => {
  console.log(`Server running on Port:${PORT}`);
});
