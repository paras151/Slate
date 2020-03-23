var express = require("express");
// var mongoose = require("mongoose");

var listModel = require("../model/listModel");
var planModel = require("../model/planModel");

var userModel = require("../model/userModel");
var {isLoggedIn} = require('./authController');

const getAllLists = async (req,res)=>{
    listModel.find({}).then((d)=>{
        res.send(d)
    });
}

const getTop5 = (req,res,next)=>{
    req.query={
        price: { gt: '300' },
        sort: 'price,-ratingsAverage',
        filter: 'name,duration,price',
        page: '1',
        limit: '2'
    }
    next();
}
const getList = (req,res)=>{
    var id = req.params.id;
    ListModel.findById(id)
    .then((d)=>{
        res.send(d);
    })
}
const createList = async (req,res)=>{
    try{
        // console.log(req.body)
    var result = await listModel.create(req.body);
    var myid = result._id;
    // console.log(result);
    var id = req.body.id;
    console.log("id"+id)
    var plan = await planModel.find({"_id":id}).updateOne({"$push":{list:myid}})
    console.log(plan)
    res.status(201).json({
        result:result
    })
    }
    catch(err){
        console.log(err);
    }
}
const updateList = async (req,res)=>{
    var id = req.params.id;
    ListModel.findByIdAndUpdate(id,req.body,(d)=>{
         res.status(401).json({
            result:d
        })
    })
    
}

const deleteList = async (req,res)=>{
    var id = req.params.id;
    console.log(id)
    try{
        var result = await ListModel.findByIdAndDelete(id);
        res.status(201).json({
            result:result
        })
        }
        catch(err){
            console.log(err);
        }
}
// const checkReqBody = (req,res,next)=>{
//     if(req.body.name == undefined || req.body.Price == undefined){
//         return res.status(401).json({
//             "status":"bad request"
//         })
//     }
//     next();
// }

// const checkId = (req,res,next,id)=>{
//     var obj = Lists.find(obj => {
//         return obj.id == id;
//     });
//     if(!obj){
//         return res.status(404).json({
//             "status": "Data not found"
//         })
//     }
//     next();
// }

module.exports = {getAllLists, getList, updateList, createList, deleteList,getTop5 }