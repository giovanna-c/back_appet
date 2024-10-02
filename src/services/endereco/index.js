import dotenv from "dotenv";
import { enderecoModel } from "../../schemas/endereco.schema.js";

dotenv.config();

export const getEnderecoRouteHandler = async (req, res) => {
  const endereco = await enderecoModel.find(req.body.data.attributes);

  if (!endereco) {
    res.status(400).json({error: 'Nenhum endereço encontrado.'});
  } else {
    res.send(endereco)
  }
};

export const registerEnderecoRouteHandler = async (
  req, res, id_usuario, cep, estado, cidade, bairro, logradouro, numero, complemento
) => {

  const newEndereco = new enderecoModel({
    id_usuario: id_usuario,
    cep: cep,
    estado: estado,
    cidade: cidade,
    bairro: bairro,
    logradouro: logradouro,
    numero: numero,
    complemento: complemento,
    created_at: Date.now()
  });

  await newEndereco.save();

  return res.status(200).json({ message: "Endereço cadastrado com sucesso!"});
};

export const updateEnderecoRouteHandler = async (req, res) => {
  const { cep, estado, cidade, bairro, logradouro, numero, complemento } = req.body.data.attributes;
  const enderecoAtual = await enderecoModel.findOne({ _id: req.params.id});

  const newEndereco = {
    cep,
    estado,
    cidade,
    bairro,
    logradouro,
    numero,
    complemento,
    updated_at: Date.now()
  };

  if (!enderecoAtual) {
    res.status(400).json({error: 'Nenhum endereço encontrado'});
  } else {
    try{
      await enderecoModel.updateOne({ _id: req.params.id }, newEndereco);
      res.status(200).json({message: 'Endereço atualizado com sucesso!'});
    } catch(err) {
      res.status(400).json({error: 'Erro ao atualizar endereço.'});
    }
  }
};

export const deleteEnderecoRouteHandler = async (req, res) => {
  const endereco = await enderecoModel.findOne({ _id: req.params.id});

  if (!endereco) {
    res.status(400).json({error: 'Nenhum endereço encontrado'});
  } else {
    try {
      await enderecoModel.deleteOne({ _id: req.params.id })
  
      res.status(200).json({ message: 'Endereço removido com sucesso!' })
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  }
};
