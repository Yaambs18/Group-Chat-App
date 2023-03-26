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

async function sendMsg(category, categoryId) {
    event.preventDefault();
    try {
        const msgObj = {
            token: token,
            msg: msgData.value
        }
        if(category==='group'){
            const result = await axios.post(`http://localhost:3000/chat/grpMsg/${categoryId}`, msgObj, { headers: {'Authorization': token }});
            displayMessage(result.data.message);
        }
        else if(category === 'user'){
            const result = await axios.post(`http://localhost:3000/chat/userMsg/${categoryId}`, msgObj, { headers: {'Authorization': token }});
            displayMessage(result.data.message);
        }
        msgData.value = '';
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

async function getMessages(category, categoryId) {
    try{
        let lastMsgId = -1;
        const oldMsgs = JSON.parse(localStorage.getItem('oldMsgs'));
        const chatBox = document.querySelector('#chat-msgs-box');
        chatBox.innerHTML = "";
        
        if(oldMsgs && oldMsgs.length>0){
            for(message of oldMsgs){
                displayMessage(message);
            }
            console.log(oldMsgs);
            lastMsgId = oldMsgs[oldMsgs.length-1].id;
        }
        const res = await axios.get(`http://localhost:3000/chat/messages?category=${category}&categoryId=${categoryId}&lastMsgId=${lastMsgId}`, { headers: { 'Authorization': token }});
        // console.log(res.data);
        const resMessages = res.data.messages;
        for(message of resMessages){
            displayMessage(message);
        }
        let allMsgs;
        if(!oldMsgs){
            allMsgs = resMessages;
        }else{
            allMsgs = oldMsgs.concat(resMessages)
        }
        if(allMsgs.length > 12){
            allMsgs.splice(0, allMsgs.length - 12);
        }
        // console.log(resMessages);
        // localStorage.setItem('oldMsgs', JSON.stringify(allMsgs));
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