import { Schema, model, connection, Model } from "mongoose"

enum StatusEnum {
  pendente = "Pendente",
  completa = "Completa"
}

export type TaskType = {
  _id: string,
  title: string,
  date: Date,
  status: StatusEnum,
  userId: string
}

const schema = new Schema<TaskType>({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, default: StatusEnum.pendente, enum: StatusEnum },
  userId: { type: String, required: true }
})

const modelName: string = 'Task'

export default (connection && connection.models[modelName]) ? connection.models[modelName] as Model<TaskType> : model<TaskType>(modelName, schema)