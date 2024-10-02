import express from "express";
import { getAnimalsRouteHandler, registerRouteHandler, updateAnimalRouteHandler, deleteAnimalRouteHandler } from "../../services/animal/index.js";

const router = express.Router();

router.get("/", (req, res) => {
  getAnimalsRouteHandler(req, res);
});

router.post("/register", async (req, res) => {
  const { id_usuario, raca, cor, sexo, idade, tipo_idade, tipo, data_nascimento, nome, porte, status, vacinado, castrado, observcao } = req.body.data.attributes;
  await registerRouteHandler(req, res, id_usuario, raca, cor, sexo, idade, tipo_idade, tipo, data_nascimento, nome, porte, status, vacinado, castrado, observcao);
});

router.put('/:id', async (req, res) => {
  updateAnimalRouteHandler(req, res);
});

router.delete('/:id', async (req, res) => {
  deleteAnimalRouteHandler(req, res);
});

export default router;
