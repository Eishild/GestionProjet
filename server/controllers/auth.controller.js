import bcrypt from "bcrypt"
import "dotenv/config"

import jwt from "jsonwebtoken"
import User from "../models/User.model.js"
import { registerValidation } from "./validation.js"

//Creation d'un utilisateur

export const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body

  const parsSalt = parseInt(process.env.SALT_ROUND)
  const salt = bcrypt.genSaltSync(parsSalt)
  try {
    const { error, value } = await registerValidation(req.body)
    const hash = bcrypt.hashSync(password, salt)
    const newUser = new User({ firstName, lastName, email, password: hash })

    await newUser.save()
    res.status(201).json({ newUser, message: "", succes: true })
  } catch (err) {
    console.log(err.message)
    res.send({ succes: false, message: err.message })
  }
}

export const verifyJwt = (req, res) => {
  const token = req.headers["x-access-token"]
  console.log(token)
  if (token) {
    jwt.verify(token, "MA_PHRASE_SECRETE", (err, decoded) => {
      // console.log(decoded)
      if (decoded) {
        res.json({ log: true })
      } else {
        res.json({ log: false })
      }
    })
  } else {
    res.json({ log: false })
  }
}
//Login d'un utilisateur
export const login = async (req, res) => {
  // const user = await User.findOne({ email: req.body.email })
  // try {
  //   const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY)
  //   res.status(201).json(token)
  // } catch (err) {
  //   console.log(err.message)
  // }
}
