
import Task from "../model/Task"
import { TaskType } from "../model/Task"

export const getTasks = async () => {
  try {
    const tasks = await Task.find().sort({ date: -1 })
    return tasks
  }
  catch (error) {
    return false
  }
}

export const createTask = async (task: TaskType) => {
  try {
    const hasTask = await Task.find({ title: task.title, date: task.date })

    if (!hasTask) {
      await Task.create({
        id: task.id,
        title: task.title,
        status: task.status,
        date: task.date
      })
    }
  }
  catch (error) {
    console.log(error)
    return false
  }
}

export const updateTask = async ({ id, status }: Partial<TaskType>) => {
  try {
    const hasTask = await Task.find({ id })

    if (hasTask) {
      await Task.updateOne({ id }, {
        status
      })
    }
  }
  catch (error) {
    console.log(error)
    return false
  }
}

export const deleteTask = async ({ id }: TaskType) => {
  try {
    const hasTask = await Task.find({ id })

    if (hasTask) {
      await Task.deleteOne({ id })
    }
  }
  catch (error) {
    console.log(error)
    return false
  }
}