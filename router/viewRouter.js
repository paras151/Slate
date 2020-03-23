var express = require('express');
var viewRouter = express.Router();
const {protectRoute,isLoggedIn} = require("../controller/authController");
const {viewHome,viewLogin,viewPlans,viewUser,viewUpdateUser,viewPlan,updatePassword,viewSignUp,viewPlanDetails} = require("../controller/viewController");
const {getCheckout} = require("../controller/bookingController");
viewRouter.use(isLoggedIn);

viewRouter.route("/home").get(protectRoute,viewHome)
viewRouter.route("/").get(protectRoute,viewHome)
viewRouter.route("/login").get(viewLogin)
viewRouter.route("/plan/:id").get(viewPlan);
viewRouter.get("/plans",viewPlans)
viewRouter.get("/me",protectRoute,viewUser);
viewRouter.get("/update",protectRoute,viewUpdateUser)
// viewRouter.get("/plan",viewPlan);
viewRouter.get("/updatePassword",protectRoute,updatePassword);
viewRouter.get("/signup",viewSignUp);
viewRouter.get("/planDetail",viewPlanDetails);
viewRouter.get("/buyPlan/:planid",getCheckout,viewPlanDetails);
module.exports = viewRouter;