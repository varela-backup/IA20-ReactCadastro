import express from "express"
import database from "./database"
import { randomBytes } from "crypto"

type TSession = {
   [key: string]: {
      id: number,
      nome: string,
      email: string,
   } | undefined
}

const port = 8080
const app = express()
const session: TSession = {}

app.use(express.json())
app.use("/", express.static("../app/dist"))

// CREATE
app.post("/api/user/", (req, res) => {
   const errors: string[] = []

   if (!req.body.name)
      errors.push("No name specified")

   if (!req.body.password)
      errors.push("No password specified")

   if (!req.body.email)
      errors.push("No email specified")

   if (errors.length) {
      res.status(400).json({ "error": errors.join() })
      return
   }

   const { name, email, password } = req.body
   const sql = 'INSERT INTO user (name, email, password) VALUES (?,?,?)'
   const params = [name, email, password]

   database.run(sql, params, function (err) {
      if (err) {
         res.status(400).json({ "error": err.message })
         return
      }

      res.status(200).json({
         "message": "success",
         "data": { name, email, password },
         "id": this.lastID
      })
   })
})

app.post("/api/login/", (req, res) => {
   const sql = "SELECT id, name, email FROM user WHERE email=? AND password=?"
   const { email, password } = req.body

   database.get(sql, [email, password], (err, row) => {
      if (err) {
         res.status(400).json({ "error": err.message });
         return;
      }

      if (!row?.id) {
         res.status(404).json({ "error": "user not found!" })
         return
      }

      randomBytes(48, (err: any, buffer: any) => {
         const token = buffer.toString('hex')
         session[token] = row
         res.status(200).json({ "message": "success", token })
      })
   })
})

app.get("/api/logged/:token", (req, res) => {
   const user = session[req.params.token]

   if (!user) {
      res.status(400).json({ error: "Usuário não esta logado!"})
      return
   }

   res.json(user)
})


app.listen(port, () => console.log(`⚡ servidor ${port}`))