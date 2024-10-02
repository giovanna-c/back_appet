import express from 'express';

const router = express.Router();
import { getUsersRouteHandler, updateUserRouteHandler, deleteUsersRouteHandler } from "../../services/user/index.js";
import { registerRouteHandler } from "../../services/auth/index.js"

router.post("/register", async (req, res) => {
  const { nome, email, senha, telefone, tipo, id_ong } = req.body.data.attributes;
  await registerRouteHandler(req, res, nome, email, senha, telefone, tipo, id_ong);
});

router.post("/filter", async (req, res) => {
  await getUsersRouteHandler(req, res);
});

router.get('/', async (req, res) => {
  getUsersRouteHandler(req, res);
});

router.put('/:id', async (req, res) => {
  updateUserRouteHandler(req, res);
});

router.delete('/:id', async (req, res) => {
  deleteUsersRouteHandler(req, res);
});

export default router;
