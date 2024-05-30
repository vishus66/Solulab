const Todo = require("../model/To-DoList")

async function createData(req,res){
    try {
        let data = new Todo(req.body)
        await data.save()
        res.send({result:"Done",message:"Created..",data:data})
    } catch (error) {
        if(error.errors.title){
            res.send({result:"Error",meesage:error.errors.title.message })
        }
        else if(error.errors.description){
            res.send({result:"Error",meesage:error.errors.description.message })
        }
        else{
            res.status(500).send({result:"fail",message:"Some Internal server Error.."})
        }
    }
}

async function getdata(req,res){
    try {
        let data  = await Todo.find().sort({_id:-1})
        res.send({result:"Done",data:data})
    } catch (error) {
        if(error.errors.title)
            res.status(500).send({result:"fail",message:error.errors.title.message}) 
        else if(error.errors.description)
            res.status(500).send({result:"fail",message:error.errors.description.message})
        else
            res.status(500).send({result:"fail",message:"Some Internal server Error.."})          
    }
} 

async function getOneData(req,res){
    try {
        let data = await Todo.findOne({_id:req.params._id})
        if(data)
            res.send({result:"Done",data:data})
        else
            res.send({result:"Fail",message:"data is not Found..."})
    } catch (error) {
        res.status(500).send({result:"fail",message:"Some Internal server Error.."})  
    }
}

async function updatedata(req,res){
    try {
        let data =  await Todo.findOne({_id:req.params._id})
        if(data){
            data.title = req.body.title??data.title
            data.description = req.body.description??data.description
            data.status = req.body.status??data.status
            await data.save()
            res.send({result:"Done",message:"data is updated.."})
        }
        else{
            res.status(400).send({result:"Done",message:"Data is not find.."})
        }
    } catch (error) {
        res.status(500).send({result:"fail",message:"Some Internal server Error.."})         
    }
}

async function Deleting(req,res){
    try {
        let data = await Todo.findOne({_id:req.params._id})
        if(data){
            await data.deleteOne()
            res.send({result:"Done"})
        }
        else{
            res.send({result:"Fail",message:"Data is not found.."})
        }
    } catch (error) {
        res.status(500).send({result:"fail",message:"Some Internal server Error.."})                 
    }
}

async function searching(req, res) {
    try {
        const searchTerm = req.query.title || "";
        // console.log(searchTerm)
        const data = await Todo.find({ title: { $regex: searchTerm, $options: "i" } });
        
        if (data.length > 0) {
            res.send({ result: "Done", message: "Searching result", data: data });
        } else {
            res.send({ result: "Done", message: "Result Not Found.." });
        }
    } catch (error) {
        res.status(500).send({ result: "fail", message: "Some Internal server Error.." });
    }
}



module.exports = {
    createData,
    getdata,
    getOneData,
    updatedata,
    Deleting,
    searching
}