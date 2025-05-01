function sendMessage() {
    const userMessage = document.getElementById('userInput').value;

    if (!userMessage.trim()) return;

    const messageElement = document.createElement('div');
    messageElement.innerHTML = `<strong>Você:</strong> ${userMessage}`;
    document.getElementById('messages').appendChild(messageElement);

    document.getElementById('userInput').value = '';

    fetch('https://lilianksouza.app.n8n.cloud/webhook-test/16db7c35-f541-4096-a885-e36a861585ad', {
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
        const botMessageElement = document.createElement('div');
        botMessageElement.innerHTML = `<strong>Bot:</strong> ${data.response}`;
        document.getElementById('messages').appendChild(botMessageElement);
    })
    .catch(error => {
        console.error('Erro ao enviar mensagem:', error);
    });
}
