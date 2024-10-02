import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import { userModel } from "../../schemas/user.schema.js";
dotenv.config();

export const getProfileRouteHandler = (req, res) => {
  const meUser = req.user;

  const stringId = req.user.id;
  const decId = stringId.substring(4, 8);
  const intId = parseInt(decId, 16);

  const sentData = {
    data: {
      type: 'users',
      id: intId === 1 ? intId : meUser.id,
      attributes: {
        nome: meUser.nome,
        email: meUser.email,
        profile_image: null,
        createdAt: meUser.createdAt,
        updateAt: meUser.updateAt
      },
      links: {
        self: `${process.env.APP_URL_API}/users/${meUser.id}`
      }
    }
  }
  res.send(sentData);
}

export const patchProfileRouteHandler = async (req, res) => {
  const currentDataOfUser = req.user;
  const { nome, email, novaSenha, confirmacaoSenha } = req.body.data.attributes;
  const foundUser = await userModel.findOne({ email: currentDataOfUser.email});

  if (!foundUser) {
    res.status(400).json({error: 'No user matches the credentials'});
  } else {
    // check password more than 8 characters, new password matched the password confirmation
    if (novaSenha && novaSenha < 7 || novaSenha != confirmacaoSenha) {
      res.status(400).json({errors: { password: ["The password should have at lest 8 characters and match the password confirmation."] }});
    } else if (novaSenha && novaSenha > 7 && novaSenha == confirmacaoSenha) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(novaSenha, salt);
      try{
        await userModel.updateOne( { email: foundUser.email }, { $set :{ "nome": nome, "email": email, "senha": hashPassword, "updated_at": Date.now() } });
      } catch(err) {
        console.error(err);
      }
      const sentData = {
        data: {
          type: 'users',
          id: foundUser.id,
          attributes: {
            nome: nome,
            email: email,
            profile_image: null,
          }
        }
      }
      res.send(sentData);
    } else if (!novaSenha) {
      try {
        await userModel.updateOne( { email: foundUser.email }, { $set :{ "nome": nome, "email": email } });
      } catch(err) {
        console.error(err);
      }
      const sentData = {
        data: {
          type: 'users',
          id: foundUser.id,
          attributes: {
            nome: nome,
            email: email,
            profile_image: null,
          }
        }
      }
      res.send(sentData);
    }
  }
}
