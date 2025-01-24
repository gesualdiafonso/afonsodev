const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();

// Middleware para interpretar o corpo das requisições POST
app.use(bodyParser.urlencoded({ extended: true }));

// Servir arquivos estáticos
app.use(express.static('--dirname'));

// Rota para o arquivo index.html na raiz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'gesualdiafonsoarr@gmail.com', // Insira seu email
        pass: 'jhku svhr cyyt fwek'            // Insira sua senha ou app password
    }
});

// Rota para processar o formulário
app.post('/send-mail', (req, res) => {
    const { name, email, telefone, message, company } = req.body;

    // Configuração do email
    const mailOptions = {
        from: email,
        to: 'gesualdiafonsoarr@gmail.com', // Insira seu email de destino
        subject: 'Novo formulário enviado',
        text: `
        Nome: ${name}
        Email: ${email}
        Telefone: ${telefone}
        Empresa: ${company || 'Não informada'}
        Mensagem:
        ${message}
        `
    };

    // Envia o email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Erro ao enviar email:', error);
            res.status(500).send('Erro ao enviar email.');
        } else {
            console.log('Email enviado:', info.response);
            res.sendFile(path.join(__dirname, 'public', 'thanks.html')); // Redireciona para a página de agradecimento
        }
    });
});

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
