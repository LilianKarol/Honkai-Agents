function sendMessage() {
    const userInput = document.getElementById('user-input');
    const userMessage = userInput.value.trim(); // Tirar espaços desnecessários
 
    if (userMessage === '') return; // Se vazio, não faz nada
 
    // Exibir a mensagem do usuário
    const messageElement = document.createElement('div');
    messageElement.classList.add('user-message');
    messageElement.innerHTML = `<strong>Você:</strong> ${userMessage}`;
    document.getElementById('messages').appendChild(messageElement);
 
    // Limpar o campo de entrada
    userInput.value = '';
 
    // Mostrar mensagem de carregando
    const loadingElement = document.createElement('div');
    loadingElement.classList.add('bot-message');
    loadingElement.innerHTML = `<strong>Bot:</strong> digitando...`;
    document.getElementById('messages').appendChild(loadingElement);
 
    // Enviar para o webhook
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
        // Atualizar a resposta do bot
        loadingElement.innerHTML = `<strong>Bot:</strong> ${data.response || "Não entendi. 😕"}`;
    })
    .catch(error => {
        console.error('Erro:', error);
        loadingElement.innerHTML = `<strong>Bot:</strong> Ocorreu um erro.`;
    });
}