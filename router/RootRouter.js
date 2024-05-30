const Router = require("express").Router()

const Users = require("./UserRouters")
const Todo = require("./TodoRouters")

Router.use("/user",Users)
Router.use("/todo",Todo)

module.exports = Router