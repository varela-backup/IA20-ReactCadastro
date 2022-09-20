import express from "express"

const port = 8080
const app = express()

app.use("/", express.static("../cadastro/dist"))

app.get("/api", (req, res) => {
   res.json({ resposta: "oi tudo bem?" })
})

app.listen(port, () => console.log(`⚡ servidor rodando na porta ${port}`))
