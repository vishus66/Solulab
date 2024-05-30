const mongoose = require("mongoose")

async function dbConnect(req,res){
    try {
        mongoose.connect("mongodb://localhost:27017/To-DoList")
        console.log("Data base is connected..")
    } catch (error) {
        console.log(error)        
    }
}

dbConnect()