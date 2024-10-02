import mongoose from "mongoose";

const animalSchema = new mongoose.Schema({
  id_usuario: {required: true, type: String},
  raca: { type: String },
  cor: { type: String },
  sexo: { required: true, type: String },
  idade: { type: Number },
  tipo_idade: { type: String },
  tipo: { required: true, type: String },
  data_nascimento: { type: Date },
  nome: { type: String },
  porte: { required: true, type: String },
  status: { type: String },
  vacinado: { required: true, type: Boolean },
  castrado: { required: true, type: Boolean },
  observcao: { type: String },
  created_at: { type: Date },
  updated_at: { type: Date },
});

animalSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

animalSchema.set("toJSON", { virtuals: true });

export const animalModel = mongoose.model("Animal", animalSchema);
