import express from "express";
import { getMensagensRouteHandler, registerMensagemRouteHandler, updateMensagemRouteHandler, deleteMensagemRouteHandler } from "../../services/mensagem/index.js";

const router = express.Router();

router.get("/", (req, res) => {
  getMensagensRouteHandler(req, res);
});

router.post("/", async (req, res) => {
  const { id_remetente, id_destinatario, mensagem, status } = req.body.data.attributes;
  await registerMensagemRouteHandler(req, res, id_remetente, id_destinatario, mensagem, status);
});

router.put('/:id', async (req, res) => {
  updateMensagemRouteHandler(req, res);
});

router.delete('/:id', async (req, res) => {
  deleteMensagemRouteHandler(req, res);
});

export default router;
