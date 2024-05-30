const mongoose = require("mongoose")

const UsersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is Mendatory"]
    },
    username: {
        type: String,
        unique: true,
        required: [true, "UsersName is Mendatory"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is Mendatory"]
    },
    Phone: {
        type: String,
        required: [true, "Phone is Mendatory"]
    },
    password: {
        type: String,
        required: [true, "password is Mendatory"]
    },
    address: {
        type: String,
        default:""
    },
    pin: {
        type: String,
        default:""
    },
    city: {
        type: String,
        default:""
    },
    State: {
        type: String,
        default:""
    },
    Role: {
        type: String,
        default:"Buyer"
    },
    active:{
        type:Boolean,
        default:true
    },
    pic: {
        type: String,
        default:""
    }
})
const Users = new mongoose.model("Users", UsersSchema)
module.exports = Users