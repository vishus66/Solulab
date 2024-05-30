const Users = require("../model/UserModel");
const fs = require("fs");
var passwordValidator = require("password-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Create a schema
var schema = new passwordValidator();

schema
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(100) // Maximum length 100
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(2) // Must have at least 2 digits
  .has()
  .not()
  .spaces() // Should not have spaces
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123"]); // Blacklist these values

//Here is created Record for the users
async function createRecord(req, res) {
  console.log(req.body.password);
  if (schema.validate(req.body.password)) {
    let data = new Users(req.body);
    bcrypt.hash(req.body.password, 12, async (error, hash) => {
      if (error) {
        res.send({ Result: "Fail", message: "Internal server Error" });
      } else {
        data.password = hash;
        try {
          await data.save();
          res.send({ result: "Done", data: data });
        } catch (error) {
          var errorMessage = {};
          if (error.keyValue?.email)
            errorMessage.email = "Email already exists";
          if (error.keyValue?.username)
            errorMessage.username = "Username already exists";
          if (error?.errors?.name)
            errorMessage.name = error.errors.name.message;
          if (error?.errors?.Phone)
            errorMessage.phone = error.errors.Phone.message;
          if (error?.errors?.email)
            errorMessage.email = error.errors.email.message;
          if (error?.errors?.username)
            errorMessage.username = error.errors.username.message;
          if (Object.keys(errorMessage).length === 0)
            errorMessage.error = "Internal server Error..";
          res.send({ result: "Fail", error: errorMessage });
        }
      }
    });
  } else {
    res.send({
      result: "Fail",
      error:
        "Password is not valid , password must contain ateleast 8 charater , 1 Lower case ,1 Uper case and atleast 1 digit and passord not contain the space and atleast 36 length",
    });
  }
}
async function getRecord(req, res) {
  try {
    let data = await Users.find().sort({ _id: -1 });
    res.send({ result: "Done", count: data.length, data: data });
  } catch (error) {
    res.status(500).send({ result: "Fail", reason: "Internal Server Error" });
  }
}
// Geting the single record
async function getSingleRecord(req, res) {
  try {
    let data = await Users.findOne({ _id: req.params._id });
    if (data) res.send({ result: "Done", data: data });
    else res.status(404).send({ result: "Fail", reason: "Record Not Found" });
  } catch (error) {
    res.status(500).send({ result: "Fail", reason: "Internal Server Error" });
  }
}
// Updating the record
async function updateRecord(req, res) {
  try {
    let data = await Users.findOne({ _id: req.params._id });
    if (data) {
      data.name = req.body.name ?? data.name;
      data.phone = req.body.phone ?? data.phone;
      data.address = req.body.address ?? data.address;
      data.pin = req.body.pin ?? data.pin;
      data.city = req.body.city ?? data.city;
      data.state = req.body.state ?? data.state;
      data.active = req.body.active ?? data.active;
      if (req.file) {
        try {
          fs.unlinkSync(data.pic);
        } catch (error) {}
        data.pic = req.file.path;
      }
      await data.save();
      res.send({ result: "Done", message: "Record is updated..", data: data });
    } else res.status(404).send({ result: "Fail", reason: "Record Not Found" });
  } catch (error) {
    if (error.errors.name)
      res
        .status(400)
        .send({ result: "Fail", reason: error.errors.name.message });
    else if (error.errors.phone)
      res
        .status(400)
        .send({ result: "Fail", reason: error.errors.phone.message });
    else if (error.errors.email)
      res
        .status(400)
        .send({ result: "Fail", reason: error.errors.email.message });
    else if (error.errors.username)
      res
        .status(400)
        .send({ result: "Fail", reason: error.errors.username.message });
    else if (error.errors.pic)
      res
        .status(400)
        .send({ result: "Fail", reason: error.errors.pic.message });
    else
      res.status(500).send({ result: "Fail", reason: "Internal Server Error" });
  }
}
// Deleting the record
async function deleteRecord(req, res) {
  try {
    let data = await Users.findOne({ _id: req.params._id });
    if (data) {
      try {
        fs.unlinkSync(`public/Users/${data.pic}`);
      } catch (error) {}
      await data.deleteOne();
      res.send({ result: "Done" });
    } else res.status(404).send({ result: "Fail", reason: "Record Not Found" });
  } catch (error) {
    res.status(500).send({ result: "Fail", reason: "Internal Server Error" });
  }
}
// Login 
async function login(req,res){
    try {
        let data = await Users.findOne({
            $or:[
                {username:req.body.username},
                {email:req.body.email},
            ]
        })
        if(data){
            if(await bcrypt.compare(req.body.password,data.password)){
                res.send({Result:"Done",login:"login",data:data})
            }
            else{
                res.send({result:"Fail",message:"Invalide username and Password"})
            }
        }
        else{
            res.status(401).send({result:"Fail",message:"Invalide Username or password"})
        }
    } catch (error) {
        res.status(500).send({result:'Fail',message:"Some Internal server Error"})
        
    }
}



module.exports = {
  createRecord,
  getRecord,
  getSingleRecord,
  updateRecord,
  deleteRecord,
  login
};
