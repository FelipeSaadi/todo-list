import { Schema, model, connection, Model } from "mongoose"

export type UserType = {
  _id: string,
  email: string,
  password: string
}

const schema = new Schema<UserType>({
  email: { type: String, required: true },
  password: { type: String, required: true }
})

const modelName: string = 'User'

export default (connection && connection.models[modelName]) ? connection.models[modelName] as Model<UserType> : model<UserType>(modelName, schema)