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
async function main(vs_rementente){ 
    let transporter = nodemailer.createTransport({
        host: 'smtp.googlemail.com', 
        port: 465, 
        secure: true, 
        auth: {
            user: process.env.USUARIOGMAIL, 
            pass: process.env.SENHAGMAIL,
        },
    }); 
    
    let info = await transporter.sendMail({
        from: process.env.USUARIOGMAIL, 
        to: vs_rementente,
        subject: "Welcome Email", // Subject line
        text: "Teste de email", // plain text body
        html: "This email is sent through <b>GMAIL SMTP SERVER</b>", // html body
    }); 
    console.log("Message sent: %s", info.messageId);	
}

app.get('/', function(req, res)
{    
	res.send("Enviador de email pronto para ser utilizado...");	
});

app.get('/email', function(req, res)
{    
	main("cezarantsouza@gmail.com").then(res.send("So alegria")).catch(console.error);	
});