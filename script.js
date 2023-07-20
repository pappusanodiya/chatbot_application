// Get references to the chat elements
const chatContainer = document.getElementById('chat');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');

// Function to add a new message to the chat screen
function addMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender === 'user' ? 'user-message' : 'bot-message');
    messageElement.textContent = message;
    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to the bottom
}

// Function to handle form submission
function handleMessageSubmit(event) {
    event.preventDefault();
    const message = messageInput.value.trim();
    if (message !== '') {
        addMessage(message, 'user');
        messageInput.value = '';

        // Make an AJAX request to your backend CGI script
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://100.26.104.133/cgi-bin/backend.py?message=' + message, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    // Parse the JSON response
                    const response = xhr.responseText;

                    // Update the chat screen with the bot's response
                    addMessage(response, 'bot');
                } else {
                    console.error('Error: ' + xhr.status);
                }
            }
        };
        xhr.send();
    }
}
// Attach the form submission handler
messageForm.addEventListener('submit', handleMessageSubmit);
