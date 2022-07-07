import Task from "../models/Task.models.js"

export const addTask = async (req, res) => {
  try {
    const addProjetItems = new Task(req.body)
    await addProjetItems.save()
    res.status(201).json(addProjetItems)
  } catch (err) {
    res.status(400).send(err.message)
  }
}

export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
    console.log(task)
    res.status(200).json(task)
  } catch (err) {
    res.status(400).send(err.message)
  }
}

export const updateTask = async (req, res) => {
  try {
    const project = await Task.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).json(project)
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export const deleteTask = async function (req, res) {
  try {
    const project = await Task.findByIdAndDelete(req.params.id)
    res.status(200).json(project)
  } catch (err) {
    res.status(500).send(err.message)
  }
}
