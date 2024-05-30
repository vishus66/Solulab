const TodoRouter = require("express").Router()

const {createData,getdata,getOneData,updatedata,Deleting,searching} = require("../controller/To-DoList")


TodoRouter.post("/", createData)
TodoRouter.get("/", getdata)
TodoRouter.get("/:_id", getOneData)
TodoRouter.put("/:_id", updatedata)
TodoRouter.delete("/:_id", Deleting)
TodoRouter.get("/",(req, res) => {
    if (req.query.title) {
        searching(req, res);
    } else {
        getdata(req, res);
    }
})



module.exports = TodoRouter