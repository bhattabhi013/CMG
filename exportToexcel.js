const StringBuilder = require("string-builder");
const dbreturn = require('./dbconnection');
const resultRows= require('./dbconnection');
var sb = new StringBuilder();
var html= new StringBuilder(); 
let sysDate = ( d => new Date(d.setDate(d.getDate()-1)) )(new Date).toLocaleDateString();
 console.log(sysDate+"is sysdate")

    module.exports = {
    htmlBody : function (result){
    var resultRow =  JSON.stringify(result);
    
    const arr = Object.keys(resultRow).map((key) => [key, resultRow[key]]);
    
    var html = '<table >';
    html += '<tr>';
    var flag = 0;
    // $.each(resultRow[0], function(index, value){
    //     html += '<th>'+index+'</th>';
    // });
    // html += '</tr>';
    //  $.each(resultRow, function(index, value){
    //      html += '<tr>';
    //     $.each(value, function(index2, value2){
    //         html += '<td>'+value2+'</td>';
    //     });
    //     html += '<tr>';
    //  });

    for (item in resultRow) {
           console.log(resultRow[item]);
       
      }
     html += '</table>';
     


    //console.log(arr);
    
  //  console.log("resultRow new "+ resultRow);
    // var html =function htmlData(result){
    //     var tr;
    //     for (var i = 0; i < resultRows.length; i++) {
    //         tr = $('<tr/>');
    //         tr.append("<td>" + resultRows[i].User_Name + "</td>");
    //         tr.append("<td>" + resultRows[i].score + "</td>");
    //         tr.append("<td>" + resultRows[i].team + "</td>");
    //         $('table').append(tr);
    //     }
    //     console.log("tr is "+tr);
    //         return tr;
            
    //     }
    console.log("In Export toExcel Test ");
  //  console.log("html is "+ html);

   
    
    
 
    sb.append("Dear Sir(s),");
    sb.appendLine();
    sb.append("Please find the status of CMG complaints closed through mobility yesterday"+ sysDate);
    sb.append("<html><body><table style='width:100%', color='white', bgcolor='blue'><tr><th>NAME</th><th>TOTAL_CASES</th><th>TOTAL_COMPLETED</th><th>BALANCE_CASES</th><th>DISPATCHED</th><th>AKNOWLEDGED</th><th>EN_ROUTE</th><th>ARRIVED</th><th>ON_HOLD</th><th>CANCELLED</th><th>COMPLETED</th><th>QA_COMPLETED</th><th>EFFICIENCY</th></tr></table></body></html>");
    // sb.append("<table style='width:100%', bg-color='blue' , color='white' ><tr><th>User_Name</th>  <th>score</th>   <th>team</th></tr>");
    
    sb.appendLine();
    // sb.appendLine(html);
    sb.append("Pls do not revert on this Email Id. In case of any issue with report, please write to abhishek.bhatt@tatapower-ddl.com")
    sb.appendLine();
    sb.append("Thanks & Regards,")
    sb.appendLine();
    sb.append("Team IT-Mobility Support")
    sb.appendLine();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
    
    // console.log("sb is "+sb)
    // var dataDb= takeDbc();
    // console.log("data db is "+ dataDb);
    // console.log("sbc is "+ takeDbc);
    // console.log(sb.toString());
    return sb
    },
     sendMail : function(){     
     console.log("sb is "+sb)
    var soap = require('soap');                 
    var url = 'http://192.168.113.119/ndplwebservice/list.asmx?wsdl';
    var path = require('path');
    var filePath = "\\\\192.168.113.119\\tempfiles\\excel.xlsx";
    
    var args = {
    to_id: 'abhishek.bhatt@tatapower-ddl.com',
    from_id: 'webmaster@tatapower-ddl.com',
    subject_str: 'CMG Report',
    body_str:html.toString(),
    cc_id:'abhishek.bhatt@tatapower-ddl.com',
    bcc_id:'',
    attachement:filePath

    };

    // console.log("URL Is - " + url);
    // console.log(args);
    
    // console.log("Directory");
    // console.log(__dirname);
    var schedule = require('node-schedule');
    var rule = new schedule.RecurrenceRule();
    rule.hour=17;
    rule.minute=32;
    var j = schedule.scheduleJob(rule, function(){
    soap.createClient(url, function (err, client) {
        
        client.SendEmailswithAttachment(args, function (err, result) {
            // console.log(result);
            if (result.SendEmailswithAttachmentResult == 'True') {
                console.log("Abhi is a good boy!!!");
            } else {
                console.log("Abhi is not a good boy!!!");
                console.log(filePath.toString());
            }
        });
    });
  }); 
  }
    }


/*
console =>
normal text
formatted text format 1,format 2
*/
