import express from "express"
import {
  addTask,
  deleteTask,
  getTask,
  updateTask,
} from "../controllers/task.controller.js"

const router = express.Router()

router.get("/Add_task/:id", getTask)
router.post("/Add_task", addTask)
router.patch("/Add_task/:id", updateTask)
router.delete("/Add_task/:id", deleteTask)

export default router
