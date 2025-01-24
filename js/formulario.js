document.getElementById('contactForm').addEventListener('submit', async function (event) {
    event.preventDefault();  // Impede o envio padrão do formulário

    let isValid = true;

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const telefone = document.getElementById('telefone');
    const message = document.getElementById('message');
    const company = document.getElementById('company');

    // Remove mensagens de erro anteriores
    document.querySelectorAll('.error-message').forEach(e => (e.textContent = ''));

    // Valida Nome
    if (name.value.trim() === '') {
        isValid = false;
        document.getElementById('nameError').textContent = 'Por favor, insira seu nome.';
    }

    // Valida Email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        isValid = false;
        document.getElementById('emailError').textContent = 'Por favor, insira um email válido.';
    }

    // Valida Telefone
    if (!/^\d+$/.test(telefone.value)) {
        isValid = false;
        document.getElementById('telefoneError').textContent =
            'Por favor, insira apenas números no campo de telefone.';
    }

    // Valida Mensagem
    if (message.value.trim() === '') {
        isValid = false;
        document.getElementById('messageError').textContent = 'Por favor, escreva uma mensagem.';
    }

    // Interrompe o envio se o formulário não for válido
    if (!isValid) {
        return;
    }

    // Se o formulário for válido, envia via fetch
    const formData = {
        name: name.value,
        email: email.value,
        telefone: telefone.value,
        message: message.value,
        company: company.value || ''
    };

    try {
        const response = await fetch('/api/send-mail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok) {
            // Redireciona para a página de agradecimento se o email for enviado com sucesso
            window.location.href = '/thanks.html';
        } else {
            // Exibe erro caso a requisição falhe
            alert('Erro ao enviar o formulário: ' + result.message);
        }
    } catch (error) {
        console.error('Erro ao enviar formulário:', error);
        alert('Erro ao enviar o formulário. Tente novamente.');
    }
});
