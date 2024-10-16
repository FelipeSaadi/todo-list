
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
    const hasTask = await Task.findOne({ title: task.title, date: task.date })

    if (!hasTask) {
      const newTask = await Task.create({
        title: task.title,
        status: task.status,
        date: new Date(task.date)
      },)

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