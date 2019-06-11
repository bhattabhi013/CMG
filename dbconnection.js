var oracledb = require('oracledb');
var json2xls = require('json2xls');  
// var etx = require('./exportToexcel');
var excel = require('excel4node');
var workbook = new excel.Workbook();
var worksheet = workbook.addWorksheet('report.xls');
var fs = require('fs');
const exportFromJSON = require('export-from-json');
var mypw = "SH_OP";
const wait = ms => new Promise(r => setTimeout(() => r(), ms));
module.exports = {
  
  run : async function () {

  let connection;


  try {
    connection = await oracledb.getConnection({
      user: "SH_OP",
      password: mypw,
      connectString: "192.168.106.77/FFAPROD"
    });

    var result = await connection.execute(
      `select * from  
      (    select who_action__c USERNAME, 
     sum (case when status in  ('Acknowledged', 'Arrived', 'Cancelled', 'Completed', 'En-Route', 'Dispatched', 'On-Hold', 'QA Completed') then noc end) TOTAL_CASES,
     sum(case when status IN ('QA Completed', 'Completed', 'Cancelled') then noc else 0 end ) TOTAL_COMPLETED,
     sum (case when status in  ('Acknowledged', 'Arrived', 'Completed', 'En-Route', ' Dispatched', 'On-Hold', 'QA Completed', 'Cancelled') then noc end) - sum(case when status IN ('QA Completed', 'Completed', 'Cancelled') then noc else 0 end ) Balance_Cases,
     sum(case when status='Dispatched' then noc  end ) Dispatched,
     sum(case when status='Acknowledged' then noc  end ) Acknowledged,
     sum(case when status='En-Route' then noc  end ) En_Route,
     sum(case when status='Arrived' then noc  end ) Arrived,
     sum(case when status='On-Hold' then noc  end ) On_Hold,
     sum(case when status='Cancelled' then noc  end ) Cancelled,
     sum(case when status='Completed' then noc else 0  end ) Completed,
     sum(case when status='QA Completed' then noc else 0 end ) QA_Completed,
     round(sum(case when status IN ('QA Completed', 'Completed', 'Cancelled') then noc else 0 end )/
     sum (case when status in  ('Acknowledged', 'Arrived', 'Cancelled', 'Completed', 'En-Route', 'Dispatched', 'On-Hold', 'QA Completed') then noc end)*100,2)  as Efficiency
     from 
     (
     select who_action__c , 
     case
     when ACTION_STATUS__C=    'ACK'    then    'Acknowledged'
     when ACTION_STATUS__C=    'ARRV'    then    'Arrived'
     when ACTION_STATUS__C=    'ACL'    then    'Cancelled'
     when ACTION_STATUS__C=   'A601'    then    'Cancelled'
     when ACTION_STATUS__C=    'ACOM'    then    'Completed'
     when ACTION_STATUS__C=    'ADSP'    then    'Dispatched'
     when ACTION_STATUS__C=    'ANRT'    then    'En-Route'
     when ACTION_STATUS__C=    'AOH'    then    'On-Hold'
     when ACTION_STATUS__C=    'A501'    then    'QA Completed'
     end as status,
     count(1) noc from action where  action_type__C in ('CM11', 'CM15') and trunc(SCHED_DATE_FROM) >= trunc(sysdate) group by  who_action__c,
     case
     when ACTION_STATUS__C=    'ACK'    then    'Acknowledged'
     when ACTION_STATUS__C=    'ARRV'    then    'Arrived'
     when ACTION_STATUS__C=    'ACL'    then    'Cancelled'
     when ACTION_STATUS__C=   'A601'    then    'Cancelled'
     when ACTION_STATUS__C=    'ACOM'    then    'Completed'
     when ACTION_STATUS__C=    'ADSP'    then    'Dispatched'
     when ACTION_STATUS__C=    'ANRT'    then    'En-Route'
     when ACTION_STATUS__C=    'AOH'    then    'On-Hold'
     when ACTION_STATUS__C=    'A501'    then    'QA Completed'
     end
     ) group by who_action__c
     order by 13 desc
     )
     union all
          select 'Total', 
     sum (case when status in  ('Acknowledged', 'Arrived', 'Cancelled', 'Completed', 'En-Route', 'Dispatched', 'On-Hold', 'QA Completed') then noc end) TOTAL_CASES,
     sum(case when status IN ('QA Completed', 'Completed', 'Cancelled') then noc else 0 end ) TOTAL_COMPLETED,
     sum (case when status in  ('Acknowledged', 'Arrived', 'Completed', 'En-Route', ' Dispatched', 'On-Hold', 'QA Completed', 'Cancelled') then noc end) - sum(case when status IN ('QA Completed', 'Completed', 'Cancelled') then noc else 0 end ) Balance_Cases,
     sum(case when status='Dispatched' then noc  end ) Dispatched,
     sum(case when status='Acknowledged' then noc  end ) Acknowledged,
     sum(case when status='En-Route' then noc  end ) En_Route,
     sum(case when status='Arrived' then noc  end ) Arrived,
     sum(case when status='On-Hold' then noc  end ) On_Hold,
     sum(case when status='Cancelled' then noc  end ) Cancelled,
     sum(case when status='Completed' then noc else 0  end ) Completed,
     sum(case when status='QA Completed' then noc else 0 end ) QA_Completed,
     round(sum(case when status IN ('QA Completed', 'Completed', 'Cancelled') then noc else 0 end )/
     sum (case when status in  ('Acknowledged', 'Arrived', 'Cancelled', 'Completed', 'En-Route', 'Dispatched', 'On-Hold', 'QA Completed') then noc end)*100,2)  as Efficiency
     from 
     (
     select who_action__c , 
     case
     when ACTION_STATUS__C=    'ACK'    then    'Acknowledged'
     when ACTION_STATUS__C=    'ARRV'    then    'Arrived'
     when ACTION_STATUS__C=    'ACL'    then    'Cancelled'
     when ACTION_STATUS__C=   'A601'    then    'Cancelled'
     when ACTION_STATUS__C=    'ACOM'    then    'Completed'
     when ACTION_STATUS__C=    'ADSP'    then    'Dispatched'
     when ACTION_STATUS__C=    'ANRT'    then    'En-Route'
     when ACTION_STATUS__C=    'AOH'    then    'On-Hold'
     when ACTION_STATUS__C=    'A501'    then    'QA Completed'
     end as status,
     count(1) noc from action where  action_type__C in ('CM11', 'CM15') and trunc(SCHED_DATE_FROM) >= trunc(sysdate) group by  who_action__c,
     case
     when ACTION_STATUS__C=    'ACK'    then    'Acknowledged'
     when ACTION_STATUS__C=    'ARRV'    then    'Arrived'
     when ACTION_STATUS__C=    'ACL'    then    'Cancelled'
     when ACTION_STATUS__C=   'A601'    then    'Cancelled'
     when ACTION_STATUS__C=    'ACOM'    then    'Completed'
     when ACTION_STATUS__C=    'ADSP'    then    'Dispatched'
     when ACTION_STATUS__C=    'ANRT'    then    'En-Route'
     when ACTION_STATUS__C=    'AOH'    then    'On-Hold'
     when ACTION_STATUS__C=    'A501'    then    'QA Completed'
     end
     )
     
     `, [], {
        outFormat: oracledb.OBJECT // Return the result as Object
      }
    );
   // console.log(result);
  //  var resultrows = result.rows;
  //  module.exports =resultrows;

    var xlsx = json2xls(result.rows);


    //console.log('Take DBC Fired.....');
    //var ResultRow = etx.takeDbc(result.rows);
    // console.log('Result Row From TakeDBC is.....');
    // console.log(ResultRow);



    // var path = require('path');
    console.log('filePath rupesh');
    var filePath = "\\\\192.168.113.119\\tempfiles\\myreport.xlsx";    
   // console.log(filePath);

    fs.writeFileSync("\\\\192.168.113.119\\tempfiles\\excel.xlsx", xlsx, 'binary');
    // console.log("\\192.168.113.119\tempfilesexcel.xlsx");
    //workbook.write('report2.xls',result.rows)


    // const fileType = 'xls';
    // const fileName = 'ExportToXls';

  //  await wait(1000);
   return result.rows ;
    // window.exportFromJSON({ data, fileName, fileType });
  } 
  catch (err) {
    console.error(err);
    
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}
}
 


// var promise =  run().then(function(resolve){
//   console.log("resolve is "+resolve)
//   return resolve
  
// }
// (function(err){
//   console.log("error is "+err)
// }))
// console.log("promise is "+JSON.stringify(promise))


// });
  // var returnRun = run();
  // console.log("returnRun is "+ JSON.stringify(returnRun));
  
