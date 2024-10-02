import mongoose from "mongoose";

const solicitacaoSchema = new mongoose.Schema({
  id_usuario: { required: true, type: String },
  id_animal: { required: true, type: String },
  status: { required: true, type: String },
  data_envio: { required: true, type: Date },
  data_conclusao: { type: Date },
  created_at: { type: Date },
  updated_at: { type: Date },
});

solicitacaoSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

solicitacaoSchema.set("toJSON", { virtuals: true });

export const solicitacaoModel = mongoose.model("Solicitacao", solicitacaoSchema);
