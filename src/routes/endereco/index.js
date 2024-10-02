import express from "express";
import { getEnderecoRouteHandler, registerEnderecoRouteHandler, updateEnderecoRouteHandler, deleteEnderecoRouteHandler } from "../../services/endereco/index.js";

const router = express.Router();

router.get("/", (req, res) => {
  getEnderecoRouteHandler(req, res);
});

router.post("/", async (req, res) => {
  const { id_usuario, cep, estado, cidade, bairro, logradouro, numero, complemento } = req.body.data.attributes;
  await registerEnderecoRouteHandler(req, res, id_usuario, cep, estado, cidade, bairro, logradouro, numero, complemento);
});

router.put('/:id', async (req, res) => {
  updateEnderecoRouteHandler(req, res);
});

router.delete('/:id', async (req, res) => {
  deleteEnderecoRouteHandler(req, res);
});

export default router;
