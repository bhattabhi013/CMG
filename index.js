const nodemailer = require ('nodemailer');
const EmailTemplate = require('email-templates');
const Promise = require ('bluebird');
const Path = require ('path');


creds = require('./creds');
transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user: creds.user,
        pass: creds.pass
    },
}),
function sendEmail(obj){
  return  transporter.sendMail(obj);
}

    let users =[
        {
            name:'abhishek',
            email:'bhattabhi013@gamil.com'
        },
        {
            name:'abhi',
            email:'bhattabhi013@gamil.com'
        },{
            name:'abhish',
            email:'bhattabhi013@gamil.com'
        }
    ]

function LoadTemplate (templateName, contexts){
    let template = new EmailTemplate(Path.join(__dirname, 'templates', templateName));
    return Promise.all(contexts.map((context)=>{
        return new Promise((resolve,reject)=>{
                template.render(context,(err,result) =>{
                    if(err) reject (err);
                else resolve(result);
            
                });
        });
    }));
}
LoadTemplate('welcome',users).then((results)=>{
    console.log(JSON.stringify(results, null , 4));

});