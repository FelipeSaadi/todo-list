
import Task from "../models/Task"
import { TaskType } from "../models/Task"

export const getTasks = async () => {
  try {
    const tasks = await Task.find().sort({ date: 1 })
    return tasks
  }
  catch (error) {
    return false
  }
}

export const createTask = async (task: TaskType) => {
  try {
    const dateFormated = `${new Date(task.date)}Z`
    const hasTask = await Task.findOne({ title: task.title, userId: task.userId, date: dateFormated })

    if (!hasTask) {
      const newTask = await Task.create({
        title: task.title,
        status: task.status,
        date: dateFormated,
        userId: task.userId
      },)

      console.log(newTask)

      return newTask
    }
    else {
      return false
    }
  }
  catch (error) {
    return false
  }
}

export const updateTask = async ({ _id, status }: Partial<TaskType>) => {
  try {
    const hasTask = await Task.findOne({ _id })

    if (hasTask) {
      const newTask = await Task.updateOne({ _id }, {
        status
      })

      return newTask
    }
  }
  catch (error) {
    console.log(error)
    return false
  }
}

export const deleteTask = async ({ _id }: Partial<TaskType>) => {
  try {
    const hasTask = await Task.findOne({ _id })

    if (hasTask) {
      await Task.deleteOne({ _id })
      return true
    }
  }
  catch (error) {
    console.log(error)
    return false
  }
}