import dotenv from "dotenv";
import { animalModel } from "../../schemas/animal.schema.js";

dotenv.config();

export const getAnimalsRouteHandler = async (req, res) => {
  const attributes = req.body.data ? req.body.data.attributes : {};
  const animais = await animalModel.find(attributes);

  if (!animais) {
    res.status(400).json({error: 'Nenhum animal encontrado'});
  } else {
    res.send(animais)
  }
};

export const registerRouteHandler = async (
  req, res, id_usuario, raca, cor, sexo, idade, tipo_idade, tipo, data_nascimento, nome, porte, status, vacinado, castrado, observcao
) => {

  const newAnimal = new animalModel({
    id_usuario: id_usuario,
    raca: raca,
    cor: cor,
    sexo: sexo,
    idade: idade,
    tipo: tipo,
    tipo_idade: tipo_idade,
    data_nascimento: data_nascimento,
    nome: nome,
    porte: porte,
    status: status,
    vacinado: vacinado,
    castrado: castrado,
    observcao: observcao,
    created_at: Date.now()
  });

  await newAnimal.save();

  return res.status(200).json({ message: "Animal cadastrado com sucesso!"});
};

export const updateAnimalRouteHandler = async (req, res) => {
  const { id_usuario, raca, cor, sexo, idade, tipo_idade, tipo, data_nascimento, nome, porte, status, vacinado, castrado, observcao} = req.body.data.attributes;
  const foundAnimal = await animalModel.findOne({ _id: req.params.id});

  const newAnimal = {
    id_usuario,
    raca,
    cor,
    sexo,
    idade,
    tipo,
    tipo_idade,
    data_nascimento,
    nome,
    porte,
    status,
    vacinado,
    castrado,
    observcao,
    updated_at: Date.now()
  };

  if (!foundAnimal) {
    res.status(400).json({error: 'Nenhum animal encontrado'});
  } else {
    try{
      await animalModel.updateOne({ _id: req.params.id }, newAnimal);
      res.status(200).json({message: 'Animal atualizado com sucesso!'});
    } catch(err) {
      res.status(400).json({error: 'Erro ao atualizar animal.'});
    }
  }
};

export const deleteAnimalRouteHandler = async (req, res) => {
  const foundAnimal = await animalModel.findOne({ _id: req.params.id});

  if (!foundAnimal) {
    res.status(400).json({error: 'Nenhum animal encontrado'});
  } else {
    try {
      await animalModel.deleteOne({ _id: req.params.id })
  
      res.status(200).json({ message: 'Animal removido com sucesso!' })
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  }
};
