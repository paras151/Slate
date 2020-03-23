var express = require('express');
var cardsRouter = express.Router();

const {getAllCards, getCard, updateCard, createCard, deleteCard, getTop5} = require("./../controller/CardController")
const {protectRoute,authorize} = require('../controller/authController');
cardsRouter
   .route("/")
   .get(protectRoute,getAllCards) 
   .post(protectRoute,createCard);
   // .post(protectRoute,authorize("admin","owner"),createCard);

cardsRouter
   .route("/top-5-Cards")
   .get(getTop5,getAllCards)
cardsRouter
   .route("/:id")
   .get(protectRoute,getCard)
   .patch(protectRoute,authorize("admin","owner"),updateCard)
   .delete(protectRoute,authorize("admin","owner"),deleteCard);



module.exports = cardsRouter;