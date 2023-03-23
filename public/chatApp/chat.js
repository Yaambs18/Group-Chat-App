const msgData = document.querySelector('#msg-text')

document.addEventListener('DOMContentLoaded', getMessages);

const token = localStorage.getItem('token');

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