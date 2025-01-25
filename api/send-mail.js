const nodemailer = require('nodemailer');

// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'gesualdiafonsoarr@gmail.com', // Substitua pelo seu email
        pass: 'jhku svhr cyyt fwek',        // Substitua pela senha ou App Password
    },
});

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const { name, email, telefone, message, company } = req.body;

        const mailOptions = {
            from: email,
            to: 'gesualdiafonsoarr@gmail.com',
            subject: 'Novo formulário enviado',
            text: `
            Nome: ${name}
            Email: ${email}
            Telefone: ${telefone}
            Empresa: ${company || 'Não informada'}
            Mensagem:
            ${message}
            `,
        };

        try {
            // Enviar o e-mail
            await transporter.sendMail(mailOptions);
            console.log('Email enviado com sucesso');
            res.writeHead(302, { Location: '/thanks.html' }); // Redireciona para a página de agradecimento
            res.end();
        } catch (error) {
            console.error('Erro ao enviar email:', error);
            res.status(500).json({ message: 'Erro ao enviar email.' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ message: 'Método não permitido. Use POST.' });
    }
};
