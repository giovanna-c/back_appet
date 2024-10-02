import express from "express";
import { getFotoRouteHandler, registerFotoRouteHandler, updateFotoRouteHandler, deleteFotoRouteHandler } from "../../services/foto/index.js";

const router = express.Router();

router.get("/", (req, res) => {
  getFotoRouteHandler(req, res);
});

router.post("/", async (req, res) => {
  const { id_animal, path } = req.body.data.attributes;
  await registerFotoRouteHandler(req, res, id_animal, path);
});

router.put('/:id', async (req, res) => {
  updateFotoRouteHandler(req, res);
});

router.delete('/:id', async (req, res) => {
  deleteFotoRouteHandler(req, res);
});

export default router;
