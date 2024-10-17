import User from '../models/User'
import bcrypt from 'bcrypt'

export const createUser = async (email: string, password: string) => {
  const hasUser = await User.findOne({ email })

  if (!hasUser) {
    const hash = bcrypt.hashSync(password, 10)
    const newUser = await User.create({
      email,
      password: hash
    })

    return newUser
  }
  else {
    return new Error('An error has occurred at user creation')
  }
}

export const findByEmail = async (email: string) => {
  return await User.findOne({ email })
}

export const matchPassword = (password: string, encrypted: string) => {
  return bcrypt.compareSync(password, encrypted)
}