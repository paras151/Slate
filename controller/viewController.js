var planModel = require("../model/planModel")
var listModel = require("../model/listModel")
ObjectId = require('mongodb').ObjectID;
const viewHome = async (req,res)=>{
    var userPlans = await planModel.find();
    userPlans = userPlans.slice(0,3);    
    res.render("plans.ejs",{
        userPlans:userPlans,
        title:req.url.slice(1)
    });
}

const viewLogin = (req,res)=>{
    res.render("login.ejs",{
        title:req.url.slice(1)

    })

}

const viewPlans = async (req,res)=>{
    var userPlans=["User not logged in"];
    try{
        userPlans = await planModel.find({user:res.locals.userObj._id});

        if(res.locals.userObj!=NaN)
        res.render("plans.ejs",{
            userPlans:userPlans,
            title:req.url.slice(1)
      
    
        });
       
    }
    catch(err){
        res.render("home",{
            userPlans:userPlans,
            title:req.url.slice(1)
      
    
        });
    }
    // userPlans = userPlans.slice(0,3);    

    

}   

const viewUser = async(req,res)=>{
    res.render("user");
}

const viewUpdateUser = async(req,res)=>{
    res.render("updateUser");
}

const viewPlan = async(req,res)=>{
    try{
        
    var id = req.params.id;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {

    // console.log(req.params)
    // console.log("id"+id)
    var board = await planModel.findById(id);
    // console.log(board)
    var lists = board.list;
    // console.log(lists);

    if(lists){
    for(var i=0;i<lists.length;i++){
        console.log(lists[i])
        lists[i] = await listModel.findById(lists[i]);
        
    }   
    res.render("plan.ejs",{lists:lists});
}

}

    }
    catch(err){
        console.log(err)
    }
}

const updatePassword = async(req,res)=>{
    
    res.render("updatePass");
}

const viewSignUp = async(req,res)=>{
    res.render("signup");
}

const viewPlanDetails = async(req,res)=>{
    res.render("plan");
}


module.exports = {viewUser,viewHome,viewLogin,viewPlans,viewUpdateUser,viewPlan,updatePassword,viewSignUp,viewPlanDetails};