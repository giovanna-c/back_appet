import mongoose from "mongoose";

const mensagemSchema = new mongoose.Schema({
  id_remetente: { required: true, type: String },
  id_destinatario: { required: true, type: String },
  mensagem: { required: true, type: String },
  status: { required: true, type: String },
  data_envio: { required: true, type: Date },
  created_at: { type: Date },
  updated_at: { type: Date },
});

mensagemSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

mensagemSchema.set("toJSON", { virtuals: true });

export const mensagemModel = mongoose.model("Mensagem", mensagemSchema);
