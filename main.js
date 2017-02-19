// port variable
var port = 8080;// listening port

// core modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const nodemailer = require('nodemailer');

// url encode
const parser = bodyParser.urlencoded({extended:false});

// app create & set
const app = express();
app.set('view engine','ejs');

// app request,response
app.use('/style',express.static('./styles'));
// getting data
app.get('/',function(request,response){// app get request
  console.log('request : '+request.url + 'method : '+request.method);
  response.render('index');
});

// main function
app.post('/',parser,function(request,response,err){// app post request
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: request.body.login,
        pass: request.body.pass
    }
  });
  // setup email data with unicode symbols
  let mailOptions = {
    from: request.body.login, // sender address
    to: request.body.to, // list of receivers
    subject: request.body.head, // Subject line
    text: request.body.text, // plain text body
  };
  // send mail with defined transport object
  transporter.sendMail(mailOptions,function(error, info) {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
  });
  //if(err)throw err;
  response.render('success');
});
app.listen(8080);