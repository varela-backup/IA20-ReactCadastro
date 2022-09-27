import express from "express"
import database from "./database"

const port = 8080
const app = express()

app.use("/", express.static("../cadastro/dist"))

app.get("/api/users", (req, res) => {
   const sql = "SELECT id, name, email FROM user"
   database.all(sql, [], (err, rows) => {
      if (err) {
         res.status(400).json({ "error": err.message })
         return
      }

      res.json({
         "message": "success",
         "data": rows
      })
   })
})

app.get("/api/user/:id", (req, res) => {
   const sql = "SELECT id, name, email FROM user WHERE id = ?"
   database.get(sql, [req.params.id], (err, row) => {
      if (err) {
         res.status(400).json({ "error": err.message });
         return;
      }

      res.json({
         "message": "success",
         "data": row
      })
   })
})

app.listen(port, () => console.log(`⚡ servidor ${port}`))