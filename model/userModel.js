var mongoose = require("mongoose");
var validator = require('validator');
var bcrypt = require('bcrypt');
var crypto = require('crypto');
var DB = "mongodb+srv://paras:paras@cluster0-vnoia.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(DB,{
    useNewUrlParser: true
})
.then(conn=>{
    // console.log(conn.connection);
    console.log("Connected to DB")
})
mongoose.set('useNewUrlParsrer', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const userSchema = new mongoose.Schema({
    
        name: "String",
        username: "String",
        email: "String",
        address: {
          street: "String",                                       
          suite: "String",
          city: "String",
          zipcode: "String"
        },
        password:{type:String,required:true},
        confirmPassword:{type:String,validate:function(){
          return this.confirmPassword == this.password;
        }},

        phone: "String",
        plan:"String",
        role:{
          enum:["chef","admin","user","owner"],
          default:"user",
          type:String
        },
        boards:{type:Array},
        resetToken:String,
        expiresIn:Date
      
});
userSchema.pre('save',async function(next){
  this.password = await bcrypt.hash(this.password,10);
  this.confirmPassword = undefined;

  // console.log(this.password);
  next();
})
  
  userSchema.methods.createResetToken=function(){
  const cryptoToken = crypto.randomBytes(32).toString("hex");

  this.resetToken = crypto
  .createHash("sha256")
  .update(cryptoToken)
  .digest("hex");

  this.expiresIn = Date.now()+1000*60*60;
  
  return cryptoToken;
}
const userModel = mongoose.model("userModel",userSchema);


// userModel.find({name:"Premium"}).then((d)=>{
//     console.log(d);
// });
// const demoPlan = new userModel({
//     name:"Premium"
// });
// demoPlan.save()
// .then(d=>console.log(d))
// .catch(err=>console.log(err));


module.exports = userModel;