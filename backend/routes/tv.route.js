import express from "express";
import {
  getTvCotigor,
  getTvDetails,
  getTvSimilar,
  getTvtreiler,
  Tvlist,
} from "../controlled/Tv.controller.js";
const router = express.Router();

router.get("/trending", Tvlist);
router.get("/:id/trailers", getTvtreiler);
router.get("/:id/Details", getTvDetails);
router.get("/:id/Similar", getTvSimilar);
router.get("/:category", getTvCotigor);

export default router;
