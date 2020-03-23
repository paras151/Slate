var mongoose = require("mongoose");
var validator = require('validator');

var DB = "mongodb+srv://paras:paras@cluster0-vnoia.mongodb.net/test?retryWrites=true&w=majority";
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
const cardSchema = new mongoose.Schema({

        title:"String",
        desc:"String"
        // ratingsAverage: {type:Number,validate:function validator(){
        //     return this.ratingsAverage < this.totalRating;
        // }},
        // totalRating: {type:String},
        // type: {type:String},
        // name:{type:String,validate:function(){
        //     return validator.isAlpha(this.name);
        // }},
        // duration: {type:Number},
        // price: {type:Number},
        // description: {type:String}
        
      
});

const cardModel = mongoose.model("cardModel",cardSchema);
// cardModel.find({name:"Premium"}).then((d)=>{
//     console.log(d);
// });
// const democard = new cardModel({
//     name:"Premium"
// });
// democard.save()
// .then(d=>console.log(d))
// .catch(err=>console.log(err));


module.exports = cardModel;