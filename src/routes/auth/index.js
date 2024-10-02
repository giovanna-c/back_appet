import express from "express";
import {
  forgotPasswordRouteHandler,
  loginRouteHandler,
  registerRouteHandler,
  resetPasswordRouteHandler,
} from "../../services/auth/index.js";

const router = express.Router();

router.post("/login", async (req, res, next) => {
  const { email, senha } = req.body.data.attributes;
  await loginRouteHandler(req, res, email, senha);
});

router.post("/logout", (req, res) => {
  return res.sendStatus(204);
});

router.post("/register", async (req, res) => {
  const { nome, email, senha, telefone, tipo, id_ong } = req.body.data.attributes;
  await registerRouteHandler(req, res, nome, email, senha, telefone, tipo, id_ong);
});

router.post("/password-forgot", async (req, res) => {
  const { email } = req.body.data.attributes;
  await forgotPasswordRouteHandler(req, res, email);
});

router.post("/password-reset", async (req, res) => {
  await resetPasswordRouteHandler(req, res);
});

export default router;
