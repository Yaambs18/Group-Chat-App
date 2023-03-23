const msgData = document.querySelector('#msg-text')

async function sendMsg(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');
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