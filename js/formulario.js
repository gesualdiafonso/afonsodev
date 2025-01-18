document.getElementById('contactForm').addEventListener('submit', function(event){
    event.preventDefault()
    let isValid = true;

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const telefone = document.getElementById('telefone');
    const message = document.getElementById('message');

    document.querySelectorAll('.error-message').forEach(e => e.textContent = '');

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
    if (!/^\+\d{1,4} \d{1,4} \d{4,10}$/.test(telefone.value)) {
        isValid = false;
        document.getElementById('telefoneError').textContent = 'Por favor, insira um número de WhatsApp válido no formato "+XX X XXXX-XXXX".';
    }

    // Valida Mensagem
    if (message.value.trim() === '') {
        isValid = false;
        document.getElementById('messageError').textContent = 'Por favor, escreva uma mensagem.';
    }

    // Se tudo estiver válido, submeter o formulário
    if (isValid) {
        alert('Mensagem enviada com sucesso!');
        this.submit();
    }
})