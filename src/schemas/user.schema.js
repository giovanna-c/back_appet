import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  nome: { required: true, type: String },
  email: { required: true, type: String },
  senha: { required: true, type: String },
  telefone: { type: String },
  tipo: { type: String },
  id_ong: { type: String },
  created_at: { type: Date },
  updated_at: { type: Date },
});

userSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

userSchema.set("toJSON", { virtuals: true });

export const userModel = mongoose.model("User", userSchema);
