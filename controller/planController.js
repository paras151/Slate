var express = require("express");
// var mongoose = require("mongoose");

var planModel = require("../model/planModel");
var userModel = require("../model/userModel");
var {isLoggedIn} = require('./authController');

const getAllPlans = async (req,res)=>{
    try{
    let query = req.query;
    var queryObj = {...req.query};
    let excludeFromQuery = ["fields","limit","page","sort","filter"];

    for (let i = 0; i < excludeFromQuery.length; i++) {
        delete queryObj[excludeFromQuery[i]];
      }

    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(/\b(gt|gte|lte|lt)\b/g, function(match) {
      return "$" + match;
    });
    // console.log(queryString);
    // console.log(query);
    queryObj = JSON.parse(queryString);
    // console.log(queryObj);
    let result = planModel.find(queryObj);
    // console.log(result);
    if (query.sort) {

        var sortquery = query.sort;
        console.log(sortquery);
        // query = query.split(',');
        sortquery = sortquery.split(",").join(" ");
        console.log(sortquery)
      result = result.sort(sortquery);
    }

    if(query.filter){
        var filterquery = query.filter;
        console.log(filterquery);
        filterquery = filterquery.replace(/,/g, ' ');
        console.log(filterquery)
        result = result.select(filterquery+" -_id")
    }else{
        result = result.select("-__v");
    }

    if(query.page){
        var page = query.page;
        var limit = query.limit||5;

        var skips = limit*(page-1);

        result = result.skip(skips).limit(+limit);
    }
    result = await result;
    res.status(200).json({
      result: result
    });
  } catch (err) {
    res.status(401).json({
      response: "data not found",
      err: err
    });
  
}
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
const getPlan = (req,res)=>{
    var id = req.params.id;
    console.log(id)
    planModel.findById(id).then((d)=>{
        res.render("plan",{d:d});
    })
}
const createPlan = async (req,res)=>{
    try{
        req.body.user=res.locals.userObj._id
        // console.log(req.body)
    var result = await planModel.create(req.body);
    var user = await userModel.find({_id:res.locals.userObj._id}).update({$push:{boards:result._id}});
    // console.log(user)
    // console.log(result);
    res.status(201).json({
        result:result
    })
    }
    catch(err){
        console.log(err);
    }
}
const updatePlan = async (req,res)=>{
    var id = req.params.id;
    planModel.findByIdAndUpdate(id,req.body,(d)=>{
         res.status(401).json({
            result:d
        })
    })
    
}

const deletePlan = async (req,res)=>{
    var id = req.params.id;
    console.log(id)
    try{
        var result = await planModel.findByIdAndDelete(id);
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
//     var obj = plans.find(obj => {
//         return obj.id == id;
//     });
//     if(!obj){
//         return res.status(404).json({
//             "status": "Data not found"
//         })
//     }
//     next();
// }

module.exports = {getAllPlans, getPlan, updatePlan, createPlan, deletePlan,getTop5 }