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
async function main(vs_rementente,corpoEmail){ 
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
        subject: "Email de contato", // Subject line        
        html: corpoEmail, // html body
    }); 
    console.log("Message sent: %s", info.messageId);	
}

app.get('/', function(req, res)
{    
	res.send("Enviador de email pronto para ser utilizado...");	
});

app.get('/email', function(req, res)
{    
	main("cezarantsouza@gmail.com",'Corpo de email Teste').then(res.send("So alegria")).catch(console.error);	
});