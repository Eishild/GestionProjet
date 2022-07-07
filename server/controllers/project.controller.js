import Projet from "../models/Projet.model.js"

export const home = async (req, res) => {
  try {
    const project = await Projet.find()
    res.status(200).json(project)
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export const projectTask = async (req, res) => {
  try {
    const project = await Projet.findById(req.params.id)
      .populate("tasks")
      .exec()

    console.log(project)

    res.status(200).json(project)
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export const addProject = async (req, res) => {
  const title = req.body.title
  const task_id = req.body.Tasks

  try {
    const addProjet = new Projet({ title: title, tasks: task_id })
    await addProjet.save()
    res.status(201).json(addProjet)
  } catch (err) {
    res.status(400).send(err.message)
  }
}

export const updateProject = async (req, res) => {
  try {
    const tasks = await Projet.findById(req.params.id)

    const project = await Projet.findByIdAndUpdate(req.params.id, {
      _id: req.body._id,
      title: req.body.title,
      tasks: [...tasks.tasks, req.body.tasks],
    })
    res.status(200).json(project)
  } catch (err) {
    console.log(err)
    res.status(500).send(err.message)
  }
}

export const deleteProject = async function (req, res) {
  try {
    const project = await Projet.findByIdAndDelete(req.params.id)
    res.status(200).json(project)
  } catch (err) {
    res.status(500).send(err.message)
  }
}
