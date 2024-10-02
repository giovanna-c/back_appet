import dotenv from 'dotenv';
import { userModel } from "../../schemas/user.schema.js";

dotenv.config();

export const getUsersRouteHandler = async (req, res) => {
  const foundUsers = await userModel.find(req.body.data.attributes);

  if (!foundUsers) {
    res.status(400).json({error: 'Nenhum usuário encontrado'});
  } else {
    res.send(foundUsers);
  }
}

export const updateUserRouteHandler = async (req, res) => {
  const { nome, email, telefone} = req.body.data.attributes;
  const foundUser = await userModel.findOne({ _id: req.params.id});

  const newUser = {
    nome,
    email,
    telefone,
    updated_at: Date.now()
  }

  if (!foundUser) {
    res.status(400).json({error: 'Nenhum usuário encontrado'});
  } else {
    try{
      await userModel.updateOne({ _id: req.params.id }, newUser);
      res.status(200).json({message: 'Usuário atualizado com sucesso!'});
    } catch(err) {
      res.status(400).json({error: 'Erro ao atualizar usuário.'});
    }
  }
}

export const deleteUsersRouteHandler = async (req, res) => {
  const foundUser = await userModel.findOne({ _id: req.params.id});

  if (!foundUser) {
    res.status(400).json({error: 'Nenhum usuário encontrado'});
  } else {
    try {
      await userModel.deleteOne({ _id: req.params.id })
  
      res.status(200).json({ message: 'Usuário removido com sucesso!' })
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  }
}
