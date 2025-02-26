document.addEventListener("DOMContentLoaded", function() {
    const messageInput = document.getElementById("messageInput");
    const sendButton = document.getElementById("sendButton");
    const chatBox = document.getElementById("chat-box");
    const chatTitle = document.getElementById("chat-title");
    const chatContainer = document.getElementById("chatContainer");
    const chatList = document.getElementById("chatList");

    let currentChat = "chat1";  
    let chatHistory = {
        chat1: [{ type: "bot", text: "Hello! How can I help?" }],
        chat2: [{ type: "bot", text: "Hey, what's up?" }],
        chat3: [{ type: "bot", text: "Hi there! Need assistance?" }]
    };

    // Function to open a chat
    window.openChat = function(chatId, chatName) {
        currentChat = chatId;
        chatTitle.innerText = chatName;
        renderChat();
        document.body.classList.add("show-chat");
    };

    // Function to go back to chat list
    window.goBack = function() {
        document.body.classList.remove("show-chat");
    };

    // Function to send a message
    function sendMessage() {
        let messageText = messageInput.value.trim();
        if (messageText === "") return;

        chatHistory[currentChat].push({ type: "user", text: messageText });
        renderChat();
        messageInput.value = "";

        setTimeout(botReply, 1000);
    }

    function botReply() {
        let replies = ["Nice!", "How can I assist?", "That's great!", "Have a good day!"];
        chatHistory[currentChat].push({ type: "bot", text: replies[Math.floor(Math.random() * replies.length)] });
        renderChat();
    }

    function renderChat() {
        chatBox.innerHTML = "";
        chatHistory[currentChat].forEach(msg => {
            let messageDiv = document.createElement("div");
            messageDiv.classList.add("message", msg.type);
            messageDiv.textContent = msg.text;
            chatBox.appendChild(messageDiv);
        });
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    sendButton.addEventListener("click", sendMessage);
    messageInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") sendMessage();
    });

    renderChat();
});
