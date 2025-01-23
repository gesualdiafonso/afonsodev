const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/send-mail', (req, res) =>{
    const { name, email, telefone, message, company} = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'gesualdiafonsoarr@gmail.com',
            pass: 'jhku svhr cyyt fwek'
        }
    });

    const mailOptions = {
        from: email,
        to: 'gesualdiafonsoarr@gmail.com',
        subject: `New mensagem of ${name}`,
        text: `
            Name: ${name}
            Email: ${email}
            WhatsApp: ${telefone}
            Company: ${company || 'Not informed'}
            Menssage: ${message}
        `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.error('Error sending e-mail', error);
            res.status(500).send('Error sending e-mail!')
        } else{
            console.log('Send e-mail:', info.response);
            res.status(200).send('E-mail enviado con suceso!')
        }
    })
});

app.listen(port, () =>{
    console.log(`Servidor rodando en http://localhost:${3000}`)
});