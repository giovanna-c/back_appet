import mongoose from "mongoose";

const fotoSchema = new mongoose.Schema({
  id_animal: { required: true, type: String },
  path: { required: true, type: String },
  created_at: { type: Date },
  updated_at: { type: Date },
});

fotoSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

fotoSchema.set("toJSON", { virtuals: true });

export const fotoModel = mongoose.model("Foto", fotoSchema);
