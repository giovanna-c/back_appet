import express from "express";
import { getSolicitacaoRouteHandler, registerSolicitacaoRouteHandler, updateSolicitacaoRouteHandler, deleteSolicitacaoRouteHandler } from "../../services/solicitacao/index.js";

const router = express.Router();

router.get("/", (req, res) => {
  getSolicitacaoRouteHandler(req, res);
});

router.post("/filter", async (req, res) => {
  await getSolicitacaoRouteHandler(req, res);
});

router.post("/", async (req, res) => {
  const { id_usuario, id_animal, status } = req.body.data.attributes;
  await registerSolicitacaoRouteHandler(req, res,id_usuario, id_animal, status);
});

router.put('/:id', async (req, res) => {
  updateSolicitacaoRouteHandler(req, res);
});

router.delete('/:id', async (req, res) => {
  deleteSolicitacaoRouteHandler(req, res);
});

export default router;
