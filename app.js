"use strict";
const nodemailer = require("nodemailer");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = process.env.PORT || 3000;
const server = app.listen(port, function ()
{
    console.log('Servidor escutando em ' + port);
});
/* Trecho que envia email */
async function main() {
 
    let transporter = nodemailer.createTransport({
        host: 'smtp.googlemail.com', // Gmail Host
        port: 465, // Port
        secure: true, // this is true as port is 465
        auth: {
            user: process.env.USUARIOGMAIL, // generated ethereal user
            pass: process.env.SENHAGMAIL, // generated ethereal password
        },
    });
 
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"FROM_NAME" <FROM_EMAIL_ADDRESS>', // sender address
        to: "RECEPIENT_EMAIL_ADDRESS", // list of receivers
        subject: "Welcome Email", // Subject line
        text: "Hello world?", // plain text body
        html: "This email is sent through <b>GMAIL SMTP SERVER</b>", // html body
    }); 
    console.log("Message sent: %s", info.messageId);	
}

app.get('/email', function(req, res)
{    
	main().then(res.send("So alegria")).catch(console.error);	
});