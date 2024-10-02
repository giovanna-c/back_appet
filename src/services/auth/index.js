import dotenv from "dotenv";
import nodemailer from "nodemailer";
import randomToken from "random-token";
import bcrypt from "bcrypt";
import { userModel } from "../../schemas/user.schema.js";
import { passwordResetModel } from "../../schemas/passwordResets.schema.js";
import jwt from 'jsonwebtoken';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASSWORD,
  },
});

export const loginRouteHandler = async (req, res, email, senha) => {
  //Check If User Exists
  let foundUser = await userModel.findOne({ email: email });
  if (foundUser == null) {
    return res.status(400).json({
      errors: [{ detail: "Nenhum usuário encontrado com esse email!" }],
    });
  } else {
    const validPassword = await bcrypt.compare(senha, foundUser.senha);
    if (validPassword) {
      // Generate JWT token
      const token = jwt.sign(
        { id: foundUser.id, email: foundUser.email },
        "token",
        {
          expiresIn: "24h",
        }
      );
      return res.json({
        user_id: foundUser.id,
        is_ong: foundUser.id_ong ? true : false,
        token_type: "Bearer",
        expires_in: "24h",
        access_token: token,
        refresh_token: token,
      });
    } else {
      return res.status(400).json({
        errors: [{ detail: "Senha incorreta!" }],
      });
    }
  }
};

export const registerRouteHandler = async (req, res, nome, email, senha, telefone, tipo, id_ong) => {
  // check if user already exists
  let foundUser = await userModel.findOne({ email: email });
  if (foundUser) {
    // does not get the error
    return res.status(400).json({ message: "Usuário já existe." });
  }

  // check password to exist and be at least 8 characters long
  if (!senha || senha.length < 8) {
    return res
      .status(400)
      .json({ message: "A senha deve ter mais de 8 caracteres." });
  }

  // hash password to save in db
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(senha, salt);

  const newUser = new userModel({
    nome: nome,
    email: email,
    senha: hashPassword,
    telefone: telefone,
    tipo: tipo,
    id_ong: id_ong,
    created_at: Date.now(),
  });
  await newUser.save();

  // Generate JWT token
  const token = jwt.sign({ id: newUser.id, email: newUser.email }, "token", {
    expiresIn: "24h",
  });
  return res.status(200).json({
    token_type: "Bearer",
    expires_in: "24h",
    access_token: token,
    refresh_token: token,
  });
};

export const forgotPasswordRouteHandler = async (req, res, email) => {
  let foundUser = await userModel.findOne({ email: email });

  if (!foundUser) {
    return res.status(400).json({
      errors: { email: ["O email não está cadastrado."] },
    });
  } else {
    let token = randomToken(20);
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: "admin@jsonapi.com", // sender address
      to: email, // list of receivers
      subject: "Reset Password", // Subject line
      html: `<p>You requested to change your password.If this request was not made by you please contact us. Access <a href='${process.env.APP_URL_CLIENT}/auth/reset-password?token=${token}&email=${email}'>this link</a> to reste your password </p>`, // html body
    });
    const dataSent = {
      data: "password-forgot",
      attributes: {
        redirect_url: `${process.env.APP_URL_API}/password-reset`,
        email: email,
      },
    };

    // save token in db
    await passwordResetModel.create({
        email: foundUser.email,
        token: token,
        created_at: new Date(),
    });

    return res.status(204).json(dataSent);
  }
};

export const resetPasswordRouteHandler = async (req, res) => {
  const foundUser = await userModel.findOne({
    email: req.body.data.attributes.email,
  });

  if (!foundUser || !foundToken) {
    return res.status(400).json({errors: { email: ["The email or token does not match any existing user."] }});
  } else {
    const { senha, confirmacao_senha } = req.body.data.attributes;
    // validate password
    if (senha.length < 8) {
      return res.status(400).json({
        errors: {
          senha: ["The password should have at lest 8 characters."],
        },
      });
    }

    if (senha != confirmacao_senha) {
      return res.status(400).json({
        errors: {
          senha: ["The password and password confirmation must match."],
        },
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(senha, salt);

    await passwordResetModel.deleteOne({ email: foundUser.email });

    await userModel.updateOne(
      { email: foundUser.email },
      { $set: { "senha": hashPassword, "updated_at": Date.now() } }
    );
    return res.sendStatus(204);
  }
};
