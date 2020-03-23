var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const sanitizer = require('express-mongo-sanitize');
const cookieParser = require('cookie-parser');

var listsRouter = require("./router/listsRouter");

var cardsRouter = require("./router/cardsRouter");
var plansRouter = require("./router/plansRouter");
var usersRouter = require("./router/usersRouter");
var viewRouter = require("./router/viewRouter");
var bookingsRouter = require("./router/bookingsRouter");
// app.use(express.json()); 
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
app.use(cookieParser(),(req,res,next)=>{
  next();
})
app.set("view engine","pug");
app.set("views","template");


var limit = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30
})

app.use("/api",limit);
app.use(helmet());
app.use(sanitizer());

app.use("/api/plans",plansRouter);
app.use("/api/users",usersRouter);
app.use("/api/cards",cardsRouter);
app.use("/api/lists",listsRouter);
app.use("/api/bookings",bookingsRouter);
app.use("",viewRouter)
app.use(express.static(__dirname +'/public'));

app.get("/set",(req,res)=>{
  res.status(201).render("base",{
    title:"Base Page"
  });
})

// app.get("*",(req,res)=>{
//     res.status(200).render("index.html");
// })

module.exports = app;