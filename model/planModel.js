var mongoose = require("mongoose");
var validator = require('validator');

var DB = "mongodb+srv://i_am_user:user@cluster0-lbubz.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(DB,{
    useNewUrlParser: true
})
.then(conn=>{
    // console.log(conn.connection);
    console.log("Connected to DB");
})
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const planSchema = new mongoose.Schema({
     
        ratingsAverage: {type:Number,validate:function validator(){
            return this.ratingsAverage < this.totalRating;
        }},
        totalRating: {type:String},
        type: {type:String},
        name:{type:String,validate:function(){
            return validator.isAlpha(this.name);
        }},
        duration: {type:Number},
        price: {type:Number},
        description: {type:String}
        
      
});

const planModel = mongoose.model("planModel",planSchema);
// planModel.find({name:"Premium"}).then((d)=>{
//     console.log(d);
// });
// const demoPlan = new planModel({
//     name:"Premium"
// });
// demoPlan.save()
// .then(d=>console.log(d))
// .catch(err=>console.log(err));


module.exports = planModel;