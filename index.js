const express = require('express')
const app = express()
require("./dbConnect")
require('dotenv').config()
const routers = require("./router/RootRouter")
// const authenticateToken = require("./middleware/auth")

app.use(express.json())
app.use(express.static("public"))
app.use("/public", express.static("public"))
app.use("/api",routers)


app.listen(8000,()=>console.log("server is running at htt://localhost:8000")) 