const nodemailer = require('nodemailer');

// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'gesualdiafonsoarr@gmail.com', // Insira seu email
        pass: 'jhku svhr cyyt fwek'            // Insira sua senha ou app password
    }
});

module.exports = async (req, res) => {
    if (req.method === 'POST') {
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

        try {
            // Envia o email
            const info = await transporter.sendMail(mailOptions);
            console.log('Email enviado:', info.response);
            res.status(200).send({ message: 'Email enviado com sucesso!' });
        } catch (error) {
            console.error('Erro ao enviar email:', error);
            res.status(500).send({ message: 'Erro ao enviar email.' });
        }
    } else {
        // Método não permitido
        res.status(405).send({ message: 'Método não permitido. Use POST.' });
    }
};
