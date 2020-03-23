var express = require('express');
var listsRouter = express.Router();

const {getAllLists, getList, updateList, createList, deleteList, getTop5} = require("./../controller/listController")
const {protectRoute,authorize} = require('../controller/authController');
listsRouter
   .route("/")
   .get(protectRoute,getAllLists) 
   .post(protectRoute,createList);
   // .post(protectRoute,authorize("admin","owner"),createList);

listsRouter
   .route("/top-5-Lists")
   .get(getTop5,getAllLists)
listsRouter
   .route("/:id")
   .get(protectRoute,getList)
   .patch(protectRoute,authorize("admin","owner"),updateList)
   .delete(protectRoute,authorize("admin","owner"),deleteList);



module.exports = listsRouter;