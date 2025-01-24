document.getElementById('contactForm').addEventListener('submit', function (event) {
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
        event.preventDefault();
    }
});
