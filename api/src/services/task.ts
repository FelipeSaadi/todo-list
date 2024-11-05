
import Task from "../models/Task"
import { TaskType } from "../models/Task"
import { redisClient } from "../database/redis"

export const getTasks = async (userId: string) => {
  try {
    const cache = await redisClient.get(userId)
    if (cache) {
      return JSON.parse(cache)
    }

    const tasks = await Task.find({ userId }).sort({ date: 1 })

    try {
      await redisClient.set(userId, JSON.stringify(tasks), { "EX": 900 })
    } catch (error) {
      console.log(error)
    }

    return tasks
  }
  catch (error) {
    return false
  }
}

export const createTask = async (task: TaskType) => {
  try {
    const dateFormated = new Date(`${task.date} 12:00:00:000`)
    const hasTask = await Task.findOne({ title: task.title, userId: task.userId, date: dateFormated })

    if (!hasTask) {
      const newTask = await Task.create({
        title: task.title,
        status: task.status,
        date: dateFormated,
        userId: task.userId
      },)

      try {
        await redisClient.del(task.userId)
      } catch (error) {
        console.log(error)
      }

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

      try {
        await redisClient.del(hasTask.userId)
      } catch (error) {
        console.log(error)
      }

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

      try {
        await redisClient.del(hasTask.userId)
      } catch (error) {
        console.log(error)
      }

      return true
    }
  }
  catch (error) {
    console.log(error)
    return false
  }
}