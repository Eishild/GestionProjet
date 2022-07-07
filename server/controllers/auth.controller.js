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
    res.status(201).json({ newUser, message: "", success: true })
  } catch (err) {
    console.log(err.message)
    res.json({ success: false, message: err.message })
  }
}

export const verifyJwt = (req, res, next) => {
  const token = req.headers["x-access-token"]
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (decoded) {
        next()
      } else {
        res.status(400)
      }
    })
  } else {
    res.json({ log: false })
  }
}
//Login d'un utilisateur

export const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const logUser = await User.find({ email })
    if (logUser.length !== 0) {
      const verifyPwd = bcrypt.compareSync(password, logUser[0].password)
      console.log(verifyPwd)
      if (verifyPwd) {
        const token = jwt.sign(
          { logUser }, // information utilisateur
          process.env.SECRET_KEY, // valable en développement, il faudra fournir lors de la production une chaîne plus longue
          { expiresIn: "24h" } // validité temps
        )
        console.log(token)
        // console.log(token)
        res.json({
          log: true,
          token,
          logUser: logUser[0],
          idUser: logUser[0]._id,
        })
      } else {
        res.json({ log: false, message: "Email ou mot de passe incorrect" })
      }
    } else {
      res
        .status(400)
        .json({ log: false, message: "Email ou mot de passe incorrect" })
    }
  } catch (err) {
    res.json({ log: false, message: err.message })
    console.log(err.message)
  }
}
