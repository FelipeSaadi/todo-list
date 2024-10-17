import { RequestHandler } from "express";
import JWT from 'jsonwebtoken'
import * as userService from '../services/user'
import { generateToken } from "../utils";

export const register: RequestHandler = async (req, res) => {
  if (req.body.email && req.body.password) {
    let { email, password } = req.body

    const newUser = await userService.createUser(email, password)

    if (newUser instanceof Error) {
      res.json({ error: newUser.message })
    }
    else {
      const token = generateToken(newUser._id, newUser.email)

      res.json({ status: true, token })
      return
    }
  }
  else {
    res.json({ error: 'E-mail or password not sended' })
  }
}

export const login: RequestHandler = async (req, res) => {
  if (req.body.email && req.body.password) {
    let { email, password } = req.body

    const user = await userService.findByEmail(email)

    if (user && userService.matchPassword(password, user.password)) {
      const token = generateToken(user._id, user.email)

      res.json({ status: true, token })
      return
    }
  }

  res.json({ status: false })
}