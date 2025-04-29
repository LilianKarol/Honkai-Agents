function sendMessage() {
    const userMessage = document.getElementById('user-input').value;

    if (!userMessage.trim()) return;

    // Exibir a mensagem do usuário na tela
    const messageElement = document.createElement('div');
    messageElement.classList.add('user-message');
    messageElement.innerHTML = `<strong>Você:</strong> ${userMessage}`;
    document.getElementById('messages').appendChild(messageElement);

    // Limpar o campo de entrada
    document.getElementById('user-input').value = '';

    // Enviar a mensagem para o webhook (n8n)
    fetch('https://lilianksouza.app.n8n.cloud/webhook/16db7c35-f541-4096-a885-e36a861585ad', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: userMessage
        })
    })
    .then(response => response.json())
    .then(data => {
        // Exibir a resposta do bot na tela
        const botMessageElement = document.createElement('div');
        botMessageElement.classList.add('bot-message');
        botMessageElement.innerHTML = `<strong>Bot:</strong> ${data.response}`;
        document.getElementById('messages').appendChild(botMessageElement);
    })
    .catch(error => {
        const errorElement = document.createElement('div');
        errorElement.classList.add('bot-message');
        errorElement.innerHTML = `<strong>Erro:</strong> Não foi possível obter resposta.`;
        document.getElementById('messages').appendChild(errorElement);
        console.error('Erro:', error);
    });
}
