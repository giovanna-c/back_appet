import mongoose from "mongoose";

const enderecoSchema = new mongoose.Schema({
  id_usuario: { required: true, type: String },
  cep: { required: true, type: String },
  estado: { required: true, type: String },
  cidade: { required: true, type: String },
  bairro: { required: true, type: String },
  logradouro: { required: true, type: String },
  numero: { required: true, type: String },
  complemento: { type: String },
  created_at: { type: Date },
  updated_at: { type: Date },
});

enderecoSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

enderecoSchema.set("toJSON", { virtuals: true });

export const enderecoModel = mongoose.model("Endereco", enderecoSchema);
