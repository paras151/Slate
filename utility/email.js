"use strict";
const nodemailer = require("nodemailer");
const pug = require('pug');
const htmlToText = require('html-to-text');
// async..await is not allowed in global scope, must use a wrapper

module.exports = class Email{
  constructor(user,url){
    this.name = user.name;
    this.url = url;

    this.to = user.email;
    this.from = "Paras <parasmadan15@gmail.com>";
  }
  newNodeMailer(){
    return nodemailer.createTransport({
      service:"gmail",
      host: "smtp.gmail.com",
    port: 2525,
    auth: {
      user: "parasmadan15@gmail.com",
      pass: "lmzynfohxpmarmse"
      
    }
  })
}

async send(template,subject){
  var html = pug.renderFile(`${__dirname}/../template/${template}.pug`,{
    name : this.name,
    url:this.url
  })

  let emailOptions = {
    from:this.from,
    to:this.to,
    subject:subject,
    html:html,
    text:htmlToText.fromString(html)
  }

  await this.newNodeMailer().sendMail(emailOptions);
}

async sendWelcome(){
  this.send("welcome","welcome to origamy family");
}



}



    

