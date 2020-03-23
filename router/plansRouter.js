var express = require('express');
var plansRouter = express.Router();

const {getAllPlans, getPlan, updatePlan, createPlan, deletePlan, getTop5} = require("./../controller/planController")
const {protectRoute,authorize} = require('../controller/authController');
plansRouter
   .route("/")
   .get(protectRoute,getAllPlans) 
   .post(protectRoute,createPlan);
   // .post(protectRoute,authorize("admin","owner"),createPlan);

plansRouter
   .route("/top-5-plans")
   .get(getTop5,getAllPlans)
plansRouter
   .route("/:id")
   .get(protectRoute,getPlan)
   .patch(protectRoute,authorize("admin","owner"),updatePlan)
   .delete(protectRoute,authorize("admin","owner"),deletePlan);



module.exports = plansRouter;