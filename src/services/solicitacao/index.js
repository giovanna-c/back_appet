import dotenv from "dotenv";
import { solicitacaoModel } from "../../schemas/solicitacao.schema.js";
import { userModel } from "../../schemas/user.schema.js";
import { animalModel } from "../../schemas/animal.schema.js";

dotenv.config();

export const getSolicitacaoRouteHandler = async (req, res) => {
  const solicitacoes = await solicitacaoModel.find(req.body.data.attributes);

  if (!solicitacoes) {
    res.status(400).json({error: 'Nenhuma solicitação encontrada'});
  } else {
    const solicitacoesList = [];

    for (const key in solicitacoes) {
      const usuario = await userModel.findById(solicitacoes[key].id_usuario);
      const animal = await animalModel.findById(solicitacoes[key].id_animal);

      solicitacoesList.push({usuario: usuario.nome, animal: animal.nome, status: solicitacoes[key].status});
    }

    res.send(solicitacoesList)
  }
};

export const registerSolicitacaoRouteHandler = async (
  req, res, id_usuario, id_animal, status
) => {

  if (await solicitacaoModel.findOne({ id_usuario: id_usuario, id_animal: id_animal })) {
    return res.status(400).json({ message: "Solicitação já existe." });
  }

  const newSolicitacao = new solicitacaoModel({
    id_usuario: id_usuario,
    id_animal: id_animal,
    status: status,
    data_envio: Date.now(),
    created_at: Date.now()
  });

  await newSolicitacao.save();

  return res.status(200).json({ message: "Solicitação cadastrada com sucesso!"});
};

export const updateSolicitacaoRouteHandler = async (req, res) => {
  const { status, data_conclusao } = req.body.data.attributes;
  const solicitacao = await solicitacaoModel.findOne({ _id: req.params.id});

  const newSolicitacao = {
    status,
    data_conclusao,
    updated_at: Date.now()
  };

  if (!solicitacao) {
    res.status(400).json({error: 'Nenhuma solicitação encontrada'});
  } else {
    try{
      await solicitacaoModel.updateOne({ _id: req.params.id }, newSolicitacao);
      res.status(200).json({message: 'Solicitação atualizada com sucesso!'});
    } catch(err) {
      res.status(400).json({error: 'Erro ao atualizar solicitação.'});
    }
  }
};

export const deleteSolicitacaoRouteHandler = async (req, res) => {
  const solicitacao = await solicitacaoModel.findOne({ _id: req.params.id});

  if (!solicitacao) {
    res.status(400).json({error: 'Nenhuma solicitação encontrada'});
  } else {
    try {
      await solicitacaoModel.deleteOne({ _id: req.params.id })
  
      res.status(200).json({ message: 'Solicitação removida com sucesso!' })
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  }
};
