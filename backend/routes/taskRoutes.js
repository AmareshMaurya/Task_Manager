import express from "express";
import { createTask, getTasks, getStats, updateTask, deleteTask } from "../controllers/taskController.js";

const router = express.Router();

router.post("/", createTask);
router.get("/", getTasks);
router.get("/stats", getStats);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
