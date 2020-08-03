"use strict";
const nodemailer = require("nodemailer");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const assuntoEmail   = "Email de contato";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const server = app.listen(port, function ()
{
    console.log('Servidor escutando em ' + port);
});
/* Trecho que envia email */
async function envioEmail(vs_rementente,corpoEmail){ 
    let transporter = nodemailer.createTransport({
        host: process.env.SMTPGOOGLE, 
        port: process.env.PORTASMTPGOOGLE, 
        secure: true, 
        auth: {
            user: process.env.USUARIOGMAIL, 
            pass: process.env.SENHAGMAIL,
        },
    }); 
    
    let info = await transporter.sendMail({
        from:    process.env.USUARIOGMAIL, 
        to:      vs_rementente,
        subject: assuntoEmail, 
        html:    corpoEmail,
    });     
}
app.get('/', function(req, res)
{    
	res.send("Enviador de email pronto para ser utilizado...");	
});
/** Rota para enviar os emails **/
app.get('/email', function(req, res)
{    	 
	envioEmail(req.query.destinario,
			   req.query.campoEmail)
			  .then(res.send("Sucesso!"))
		      .catch(console.error);	
});