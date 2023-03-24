const msgData = document.querySelector('#msg-text')

// document.addEventListener('DOMContentLoaded', getMessages);

const token = localStorage.getItem('token');

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

async function sendMsg(e) {
    e.preventDefault();
    try {
        const msgObj = {
            token: token,
            msg: msgData.value
        }
        const result = await axios.post('http://localhost:3000/chat/userMsg', msgObj, { headers: {'Authorization': token }});
    }
    catch(error) {
        console.log(error);
        if(error.response){
            alert(error.response.data.message);
        }else{
            alert(error.message);
        }
    }
    msgData.value = '';
}

async function getMessages() {
    try{
        const res = await axios.get('http://localhost:3000/chat/messages', { headers: { 'Authorization': token }});
        console.log(res.data);
        for(message of res.data.messages){
            displayMessage(message);
        }
    }
    catch(error) {
        console.log(error);
        if(error.response){
            alert(error.response.data.message);
        }else{
            alert(error.message);
        }
    }
}

function displayMessage(messageObj) {

    const chatBox = document.querySelector('#chat-msgs-box');
    const userData = parseJwt(token);
    if(messageObj.userId === userData.userId){
        const msgDiv = document.createElement('div');
        msgDiv.className = 'my-msg';
        msgDiv.innerHTML = `<b>You</b>: ${messageObj.message}`;
        chatBox.appendChild(msgDiv);
    }
    else {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'others-msg';
        msgDiv.innerHTML = `<b>${messageObj.name}</b>: ${messageObj.message}`;
        chatBox.appendChild(msgDiv);
    }
}