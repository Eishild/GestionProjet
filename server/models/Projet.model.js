import mongoose from "mongoose"
const { Schema, model } = mongoose

const projetSchema = new Schema({
  title: { type: String, trim: true, required: true },
  tasks: [{ type: Schema.Types.ObjectId, ref: "task" }],
  date_start: { type: Date, default: Date.now },
})

const Projet = model("projet", projetSchema)

export default Projet
