import { RequestHandler } from "express"
import * as taskService from '../services/task'
import { TaskType } from "../models/Task"


export const getTasks: RequestHandler = async (req, res) => {
  const tasks = await taskService.getTasks()

  if (tasks) {
    res.status(200).json({ ok: tasks })
  }
  else {
    res.status(500).json({
      error: 'An error occurred in the request'
    })
  }
}

export const createTask: RequestHandler = async (req, res) => {
  const data = req.body
  const task = await taskService.createTask(data)

  if (task) {
    res.status(201).json({ ok: "Task created" })
  }
  else {
    res.status(500).json({
      error: 'An error occurred in the request'
    })
  }
}

export const updateTask: RequestHandler = async (req, res) => {
  const { _id } = req.params
  const { status }: TaskType = req.body

  if (!status) {
    return res.status(400).json({ error: "Status is required" })
  }

  const task = await taskService.updateTask({ _id, status: status })

  if (task) {
    res.status(200).json({ ok: "Task updated" })
  }
  else {
    res.status(500).json({
      error: 'An error occurred in the request'
    })
  }
}

export const deleteTask: RequestHandler = async (req, res) => {
  const { _id } = req.params

  const task = await taskService.deleteTask({ _id })

  if (task) {
    res.status(200).json({ ok: "Task deleted" })
  }
  else {
    res.status(500).json({
      error: 'An error occurred in the request'
    })
  }
}