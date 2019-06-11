var dbConnection = require('./dbconnection');
var mailSender = require('./exportToexcel');
var dbResult = dbConnection.run().then((result)=>{
  // console.log(JSON.stringify(result)); 
  if(result.length == 0){
    console.log("no data received...")
  }
  else{
    console.log("result received")
    var sb = mailSender.htmlBody(result);
    console.log("sb is apps "+sb);
    mailSender.sendMail();
    console.log("called sendmail")
  }
}).catch((err)=>{
  console.log("erroris "+err);
});
 console.log("dbResult is ");
 console.log(dbResult);
// var schedule = require('node-schedule');
// var rule = new schedule.RecurrenceRule();
// // rule.hour=15;
// rule.minute=50;
// var j = schedule.scheduleJob(rule, function(){
//     console.log('Hello!');
//   }); 