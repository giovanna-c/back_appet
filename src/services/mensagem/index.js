import dotenv from "dotenv";
import { mensagemModel } from "../../schemas/mensagem.schema.js";

dotenv.config();

export const getMensagensRouteHandler = async (req, res) => {
  const mensagens = await mensagemModel.find(req.body.data.attributes);

  if (!mensagens) {
    res.status(400).json({error: 'Nenhuma solicitação encontrada'});
  } else {
    res.send(mensagens)
  }
};

export const registerMensagemRouteHandler = async (
  req, res, id_remetente, id_destinatario, mensagem, status
) => {

  const newMensagem = new mensagemModel({
    id_remetente: id_remetente,
    id_destinatario: id_destinatario,
    mensagem: mensagem,
    status: status,
    data_envio: Date.now(),
    created_at: Date.now()
  });

  await newMensagem.save();

  return res.status(200).json({ message: "Mensagem cadastrada com sucesso!"});
};

export const updateMensagemRouteHandler = async (req, res) => {
  const { mensagem, status } = req.body.data.attributes;
  const mensagemAtual = await mensagemModel.findOne({ _id: req.params.id});

  const newMensagem = {
    status,
    mensagem,
    updated_at: Date.now()
  };

  if (!mensagemAtual) {
    res.status(400).json({error: 'Nenhuma mensagem encontrada'});
  } else {
    try{
      await mensagemModel.updateOne({ _id: req.params.id }, newMensagem);
      res.status(200).json({message: 'Mensagem atualizada com sucesso!'});
    } catch(err) {
      res.status(400).json({error: 'Erro ao atualizar Mensagem.'});
    }
  }
};

export const deleteMensagemRouteHandler = async (req, res) => {
  const mensagem = await mensagemModel.findOne({ _id: req.params.id});

  if (!mensagem) {
    res.status(400).json({error: 'Nenhuma mensagem encontrada'});
  } else {
    try {
      await mensagemModel.deleteOne({ _id: req.params.id })
  
      res.status(200).json({ message: 'Mensagem removida com sucesso!' })
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  }
};
