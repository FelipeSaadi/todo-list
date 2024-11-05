import { connect } from "mongoose"

export const mongoConnect = async () => {
  try {
    console.log('Connecting on mongodb')
    await connect(process.env.MONGO_URL!)
    console.log('MongoDB connected with success!')
  }
  catch (error) {
    console.log('Error to connect on MongoDB: ', error)
  }
}