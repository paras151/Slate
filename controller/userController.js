var express = require("express");

var userModel = require("../model/userModel")

const getAllUsers = (req,res)=>{
    userModel.find({}).then((d)=>{
            res.send(d)
        });
    
}
const getUser = (req,res)=>{
    var id = req.params.id;
    
    userModel.findById(id)
    .then((d)=>{
        res.render("user",{
            userObj:d
        });
    })
}
const createUser = async (req,res,)=>{
    try{
    var result = await userModel.create(req.body);
    res.status(201).json({
        result:result
    })
    }
    catch(err){
        console.log(err);
    }
}
const updateUser = async (req,res)=>{
    var id = req.params.id || req.headers.user["_id"];
    // console.log("ID: "+id);
    var result = await userModel.findByIdAndUpdate(id,req.body,{new:true})
    res.send(result)
}
const deleteUser = async (req,res)=>{
    var id = req.params.id;
    console.log(id)
    try{
        var result = await userModel.findByIdAndDelete(id);
        res.status(201).json({
            result:result
        })
        }
        catch(err){
            console.log(err);
        }
}
// const checkReqBody = (req,res,next)=>{
//     if(req.body.name == undefined || req.body.username == undefined){
//         return res.status(401).json({
//             "status":"bad request"
//         })
//     }
//     next();
// }
// const checkId = (req,res,next,id)=>{
//     var obj = users.find(obj => {
//         return obj.id == id;
//     });
//     if(!obj){
//         return res.status(404).json({
//             "status": "Data not found"
//         })
//     }
//     next();
// }

module.exports = {getAllUsers, getUser, updateUser, createUser, deleteUser }