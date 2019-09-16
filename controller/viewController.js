var planModel = require("../model/planModel")

const viewHome = async (req,res)=>{
    var userPlans = await planModel.find();
    userPlans = userPlans.slice(0,3);    
    res.render("home",{
        userPlans:userPlans,
        title:req.url.slice(1)
    });
}

const viewLogin = (req,res)=>{
    res.render("login",{
        title:req.url.slice(1)

    })

}

const viewPlans = async (req,res)=>{
    var userPlans = await planModel.find();
    // userPlans = userPlans.slice(0,3);    

    res.render("plansAlone",{
        userPlans:userPlans,
        title:req.url.slice(1)

    });

}   

const viewUser = async(req,res)=>{
    res.render("user");
}

const viewUpdateUser = async(req,res)=>{
    res.render("updateUser");
}

const viewPlan = async(req,res)=>{
    res.render("plan");
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