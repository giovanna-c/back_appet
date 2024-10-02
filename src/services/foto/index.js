import dotenv from "dotenv";
import { fotoModel } from "../../schemas/foto.schema.js";

dotenv.config();

export const getFotoRouteHandler = async (req, res) => {
  const foto = await fotoModel.find(req.body.data.attributes);

  if (!foto) {
    res.status(400).json({error: 'Nenhuma foto encontrada.'});
  } else {
    res.send(foto)
  }
};

export const registerFotoRouteHandler = async (req, res, id_animal, path) => {

  const newFoto = new fotoModel({
    id_animal: id_animal,
    path: path,
    created_at: Date.now()
  });

  await newFoto.save();

  return res.status(200).json({ message: "Foto cadastrada com sucesso!"});
};

export const updateFotoRouteHandler = async (req, res) => {
  const { id_animal, path } = req.body.data.attributes;
  const fotoAtual = await fotoModel.findOne({ _id: req.params.id});

  const newFoto = {
    id_animal,
    path,
    updated_at: Date.now()
  };

  if (!fotoAtual) {
    res.status(400).json({error: 'Nenhuma foto encontrada'});
  } else {
    try{
      await fotoModel.updateOne({ _id: req.params.id }, newFoto);
      res.status(200).json({message: 'Foto atualizada com sucesso!'});
    } catch(err) {
      res.status(400).json({error: 'Erro ao atualizar foto.'});
    }
  }
};

export const deleteFotoRouteHandler = async (req, res) => {
  const foto = await fotoModel.findOne({ _id: req.params.id});

  if (!foto) {
    res.status(400).json({error: 'Nenhuma foto encontrada'});
  } else {
    try {
      await fotoModel.deleteOne({ _id: req.params.id })
  
      res.status(200).json({ message: 'Foto removida com sucesso!' })
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  }
};
