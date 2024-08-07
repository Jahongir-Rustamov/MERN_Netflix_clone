import express from "express";
import {
  getmovieCotigor,
  getmovieDetails,
  getmovieSimilar,
  getmovietreiler,
  movielist,
} from "../controlled/movie.controll.js";

const router = express.Router();

router.get("/trending", movielist);
router.get("/:id/trailers", getmovietreiler);
router.get("/:id/Details", getmovieDetails);
router.get("/:id/Similar", getmovieSimilar);
router.get("/:category", getmovieCotigor);

export default router;
