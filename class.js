// function getMyMail(to,from,url){

//     this.to = to;
//     this.from = from;
//     this.url = url;

//     this.getSender = function(){
//         return "Sender is "+this.from;
//     }
// }

class getMyMail{
     constructor(to,from,url,fn){

        this.to = to;
        this.from = from;
        this.url = url;
        this.fn = fn;
     }
        getSender(){
            return "Sender is "+this.from;
        }
    
}
var myemail = new getMyMail(
    "abc@gmail.com",
    "xyz@gmail.com",
    "www.google.com",
    function(){
        console.log("in fn");
    }
)

console.log(myemail.getSender());
myemail.fn();
console.log(myemail);