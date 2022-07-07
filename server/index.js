import express from "express"
import mongoose from "mongoose"
import cors from "cors"

import auth from "./routes/auth.router.js"
import project from "./routes/project.router.js"
import task from "./routes/task.router.js"

mongoose.connect("mongodb://localhost:27017/Projet_ecole")

const app = express()
app.use(cors())

const port = process.env.PORT

app.use(express.json())
app.use("/auth", auth)
app.use("/project", project)
app.use("/task", task)

// CONNEXION A LA BDD MONGO

// REQUETE GET POUR AFFICHER LA LISTE DES PROJET EN BDD

// REQUET POUR AJOUTER DES PROJETS A LA BDD

// REQUET POUR MODIFIER DES PROJETS A LA BDD

// REQUET POUR AJOUTER DES OUTILS  DE PROJET A LA BDD

//RELATION ENTRE LE PROJET ET LES TACHES

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
