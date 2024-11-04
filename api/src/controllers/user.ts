import { RequestHandler } from "express";
import * as userService from '../services/user'
import { generateToken } from "../utils";

export const register: RequestHandler = async (req, res) => {
  if (req.body.email && req.body.password) {
    let { email, password } = req.body

    const newUser = await userService.createUser(email, password)

    if (newUser instanceof Error) {
      res.status(400).json({ error: newUser.message })
    }
    else {
      const token = generateToken(newUser._id, newUser.email)

      res.status(201).json({ status: true, _id: newUser._id, token })
      return
    }
  }
  else {
    res.status(400).json({ error: 'E-mail or password not sended' })
  }
}

export const login: RequestHandler = async (req, res) => {
  if (req.body.email && req.body.password) {
    let { email, password } = req.body

    const user = await userService.findByEmail(email)

    if (user && userService.matchPassword(password, user.password)) {
      const token = generateToken(user._id, user.email)

      res.status(200).json({ status: true, _id: user._id, token })
      return
    }
  }
  else {
    res.status(400).json({ status: false })
  }
}