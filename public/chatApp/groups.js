const groupBtn = document.getElementById('group-btn');

const showGroupsBtn = document.getElementById('select-group');

groupBtn.addEventListener('click', createGroup);

showGroupsBtn.addEventListener('click', showGroups);

async function createGroup() {
    const groupName = prompt('Give a name to your group.', '');
    if(groupName === '' || groupName === null){
        console.log('invalid')
        alert('Invalid group Name');
        return;
    }
    try{
        const res = await axios.post('http://localhost:3000/group/createGroup', { groupName: groupName }, { headers: { 'Authorization': token }})
    }
    catch(error) {
        console.log(error);
        if(error.response){
            alert(error.response.data.message);
        }else{
            alert(error);
        }
    }
}

async function showGroups() {
    try{
        document.getElementById('users-list').style.display = 'none';
        const groupsList = document.getElementById('groups-list');
        groupsList.style.display = 'block';

        const res = await axios.get('http://localhost:3000/group', { headers: { 'Authorization': token }})
        const groups = res.data.groups

        groupsList.innerHTML = '';
        for(group of groups) {
            showGroupsOnSidePanel(group);
        }

    }
    catch(error) {
        console.log(error);
        if(error.response){
            alert(error.response.data.message);
        }else{
            alert(error);
        }
    }
}

function showGroupsOnSidePanel(group) {
    const groupsList = document.getElementById('groups-list');

    const groupLi = document.createElement('li');
    groupLi.className = 'chat-group';

    const aboutDiv = document.createElement('div');
    aboutDiv.className = 'about';

    const groupImg = document.createElement('img');
    groupImg.classList = "rounded-5";
    groupImg.src = "https://bootdey.com/img/Content/avatar/avatar2.png";
    groupImg.alt="avatar";
    groupLi.appendChild(groupImg);

    const groupName = document.createElement('h6');
    groupName.classList = "name m-0 ps-2"
    groupName.textContent = `${group.groupName}`;
    aboutDiv.appendChild(groupName);

    const userStatus = document.createElement('i');
    userStatus.classList = "fa fa-circle online ps-2";
    userStatus.textContent = ' active';
    aboutDiv.appendChild(userStatus);

    groupLi.appendChild(aboutDiv);
    
    groupLi.addEventListener('click', () => {
        showCardTitle(group);
    });
    groupsList.append(groupLi);
}

function showCardTitle(groupObj) {
    const chatCardTitleDiv = document.querySelector('.chat-card-title');

    chatCardTitleDiv.innerHTML = '';

    const groupImg = document.createElement('img');
    groupImg.classList = "rounded-5";
    groupImg.src = "https://bootdey.com/img/Content/avatar/avatar2.png";
    groupImg.alt="avatar";
    chatCardTitleDiv.appendChild(groupImg);

    const aboutDiv = document.createElement('div');
    aboutDiv.className = 'about';

    const groupName = document.createElement('h6');
    groupName.classList = "name m-0 ps-2"
    groupName.textContent = `${groupObj.groupName}`;
    aboutDiv.appendChild(groupName);

    chatCardTitleDiv.appendChild(aboutDiv);

    const addUserBtn = document.createElement('button');
    addUserBtn.className = "btn btn-secondary";
    addUserBtn.innerHTML = `<i class="fa fa-user-plus"> Add-User</i>`;

    addUserBtn.addEventListener('click', () => addGroupUsers(groupObj.id));

    const sendMsgBtn = document.getElementById('user-msg-box');
    sendMsgBtn.addEventListener('submit', () => sendMsg('group', group.id));

    chatCardTitleDiv.appendChild(addUserBtn);

    getMessages('group', group.id);
}

async function addGroupUsers(groupId) {
    const userEmail = prompt('Enter valid user emailId else user will not added', '');
    if(userEmail === '' || userEmail === null){
        console.log('Invalid emailId')
        alert('Invalid emailId');
        return;
    }
    try{
        const addUserRes = await axios.post(`http://localhost:3000/group/${groupId}/addUser`, {userEmail: userEmail}, { headers: { 'Authorization': token }});
        alert(addUserRes.data.message);
    }
    catch(error) {
        console.log(error);
        if(error.response){
            alert(error.response.data.message);
        }else{
            alert(error);
        }
    }
}

function showGroupMessages() {
    
}