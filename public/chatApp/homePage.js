
window.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    if(!token){
        window.location.href = '../loginSignup/login.html';
    }

    try{
        const res = await axios.get(`http://44.211.89.63:3000/user`, { headers: {'Authorization': token }});
        const users = res.data;
        for(user of users) {
            userJoinedChat(user);
            showUsers(user);
        }
        // getMessages();
    }
    catch(error) {
        console.log(error);
        if(error.response){
            alert(error.response.data.message);
        }else{
            alert(error.message);
        }
    }
});

// setInterval(async () => {
//     try{
//         // const res = await axios.get(`http://44.211.89.63:3000/user`, { headers: {'Authorization': token }});
//         // const users = res.data;
//         // for(user of users) {
//         //     userJoinedChat(user);
//         //     showUsers(user);
//         // }
//         getMessages();
//     }
//     catch(error) {
//         console.log(error);
//         if(error.response){
//             alert(error.response.data.message);
//         }else{
//             alert(error.message);
//         }
//     }
// }, 1000);

const showPeopleBtn = document.getElementById('select-people');

showPeopleBtn.addEventListener('click', showPeople);

async function showPeople() {
    try{
        document.getElementById('groups-list').style.display = 'none';
        const usersListDiv = document.getElementById('users-list');
        usersListDiv.style.display = 'block';

        const res = await axios.get(`http://44.211.89.63:3000/user`, { headers: {'Authorization': token }});
        const users = res.data;
        usersListDiv.innerHTML = '';
        for(user of users) {
            showUsers(user);
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

function showUsers(user) {
    const userList = document.querySelector('#users-list');

    const userLi = document.createElement('li');
    userLi.className = 'chat-user';

    const aboutDiv = document.createElement('div');
    aboutDiv.className = 'about';

    const userImg = document.createElement('img');
    userImg.classList = "rounded-5";
    userImg.src = "https://bootdey.com/img/Content/avatar/avatar2.png";
    userImg.alt="avatar";
    userLi.appendChild(userImg);

    const userName = document.createElement('h6');
    userName.classList = "name m-0 ps-2"
    userName.textContent = `${user.name}`;
    aboutDiv.appendChild(userName);

    const userStatus = document.createElement('i');
    userStatus.classList = "fa fa-circle online ps-2";
    userStatus.textContent = ' online';
    aboutDiv.appendChild(userStatus);

    userLi.appendChild(aboutDiv);
    userLi.addEventListener('click', () => {
        showUserCardTitle(user);
    });
    userList.append(userLi);
}

function showUserCardTitle(userObj) {
    const chatCardTitleDiv = document.querySelector('.chat-card-title');

    chatCardTitleDiv.innerHTML = '';

    const userImg = document.createElement('img');
    userImg.classList = "rounded-5";
    userImg.src = "https://bootdey.com/img/Content/avatar/avatar2.png";
    userImg.alt="avatar";
    chatCardTitleDiv.appendChild(userImg);

    const aboutDiv = document.createElement('div');
    aboutDiv.className = 'about';

    const userName = document.createElement('h6');
    userName.classList = "name m-0 ps-2"
    userName.textContent = `${userObj.name}`;
    aboutDiv.appendChild(userName);

    const userStatus = document.createElement('i');
    userStatus.classList = "fa fa-circle online ps-2";
    userStatus.textContent = ' online';
    aboutDiv.appendChild(userStatus);

    chatCardTitleDiv.appendChild(aboutDiv);

    const sendMsgBtn = document.getElementById('user-msg-box');
    sendMsgBtn.addEventListener('submit', () => {
        sendMsg('user', userObj.id)
    });

    setInterval(() => {
        getMessages('user', userObj.id);
    }, 15000);
}

function userJoinedChat(user) {
    const chatBox = document.querySelector('#chat-msgs-box');

    const divElem = document.createElement('div');
    divElem.className = 'chat-joined-user';
    divElem.textContent = `${user.name} joined`;

    chatBox.appendChild(divElem);
}

const logOutBtn = document.getElementById('logOut');

logOutBtn.addEventListener('click', async () => {
    localStorage.removeItem('token');
    window.location.href = '../loginSignup/login.html';
});

downloadReport = async function (fileUrl) {
    try {
            var a = document.createElement('a');
            a.href = fileUrl;
            a.download = event.target.textContent;
            a.click();
    }
    catch (err) {
        alert(err);
    }
}