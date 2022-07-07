import express from "express"
import {
  home,
  addProject,
  updateProject,
  deleteProject,
  projectTask,
} from "../controllers/project.controller.js"

const router = express.Router()

router.get("/Home", home)
router.get("/Home/:id", projectTask)
router.post("/Add_projects", addProject)
router.patch("/Add_projects/:id", updateProject)
router.delete("/Home/:id", deleteProject)

export default router
