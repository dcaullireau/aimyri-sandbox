document.addEventListener('DOMContentLoaded', (event) => {
    const userInput = document.getElementById('userInput');
    
    userInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            displayOutput();
        }
    });
});

async function displayOutput() {
    let userInput = document.getElementById('userInput').value;
    let chatOutput = document.getElementById('chatOutput');

    // Clear input field
    document.getElementById('userInput').value = '';
    
    // Display loading message
    let loadingMessage = document.createElement('div');
    loadingMessage.className = 'chat-message';
    loadingMessage.textContent = 'Loading image...';
    chatOutput.appendChild(loadingMessage);

    let imageUrl = await getImageUrl(userInput);
    console.log("imageUrl : ", imageUrl);
    
    // Remove loading message
    chatOutput.removeChild(loadingMessage);

    // Create a message element
    let message = document.createElement('div');
    message.className = 'chat-message';
    message.textContent = userInput;

    // Create an image element
    let img = document.createElement('img');
    img.src = imageUrl;
    img.alt = userInput;
    img.style.maxWidth = '100%';
    img.style.width = '400px'; // Set the width to 512px
    img.style.height = 'auto'; // Maintain aspect ratio

    // Append the message and image to the chat output
    chatOutput.appendChild(message);
    chatOutput.appendChild(img);
    scrollToBottom(chatOutput); // Scroll to the bottom of the chat output
}

function scrollToBottom(element) {
    element.scrollTop = element.scrollHeight;
}

const auth = {
    username: "api-key",
    password: "7a355994837644649310877c9912dac2"
};

const headers = {
    "Content-Type": "application/json",
    "api-key": "7a355994837644649310877c9912dac2"
};

const url = "https://sandbox-om-openai-sweden-central.openai.azure.com/openai/deployments/dall-e-3/images/generations?api-version=2024-02-01";

async function getImageUrl(userInput) {
    let url_image = "";
    const body = {
        prompt: userInput,
        size: "1024x1024",
        n: 1,
        quality: "hd",
        style: "vivid",
        response_format: "url"
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body)
        });
        const data = await response.json();
        url_image = data.data[0].url;
        console.log(url_image);
    } catch (error) {
        console.error(error);
    }
    return url_image;
}
