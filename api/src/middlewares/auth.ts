import { NextFunction, Request, Response } from "express";

import User from "../models/User"
import { UserType } from "../models/User"
import JWT from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const Auth = {
  private: async (req: Request, res: Response, next: NextFunction) => {
    let allowed = false
    const authorization = req.headers.authorization

    if (authorization) {
      const [authType, token] = authorization.split(' ')

      if (authType === 'Bearer') {
        try {
          JWT.verify(
            token,
            process.env.JWT_SECRET_KEY as string
          )

          allowed = true
        }
        catch (error) {
          console.log('Error to decode')
        }
      }
    }

    if (allowed) {
      next()
    }
    else {
      res.status(403).json({ error: 'Not allowed' })
    }
  }
}