const UsersRouter = require("express").Router()

const { createRecord, getRecord, getSingleRecord, updateRecord, deleteRecord ,login} = require("../controller/UserController")
const {  uploaduser } = require("../middleware/middlewares")
// const authtoken = require("../middleware/auth")

UsersRouter.post("/", createRecord)
UsersRouter.get("/", getRecord)
UsersRouter.get("/:_id", getSingleRecord)
UsersRouter.put("/:_id",uploaduser.single("pic"), updateRecord)
UsersRouter.delete("/:_id", deleteRecord)
UsersRouter.post("/login", login)


module.exports = UsersRouter
