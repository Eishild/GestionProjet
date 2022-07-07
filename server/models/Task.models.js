import mongoose from "mongoose"
const { Schema, model } = mongoose

const TaskSchema = new Schema({
  title: { type: String, trim: true },
  taskType: { type: String, trim: true },
  items: Array,
})

const Task = model("task", TaskSchema)

export default Task
