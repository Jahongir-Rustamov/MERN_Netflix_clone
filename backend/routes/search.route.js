import express from "express";
import {
  getsearchHistroy,
  removeItemSearchHistory,
  searchMovie,
  searchPerson,
  searchTv,
} from "../controlled/Search.controller.js";
const router = express.Router();

router.get("/person/:query", searchPerson);
router.get("/movie/:query", searchMovie);
router.get("/tv/:query", searchTv);
router.get("/history", getsearchHistroy);
router.delete("/history/:id", removeItemSearchHistory);

export default router;
